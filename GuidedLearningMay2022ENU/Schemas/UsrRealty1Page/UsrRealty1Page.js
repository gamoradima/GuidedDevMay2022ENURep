define("UsrRealty1Page", ["ServiceHelper"], function(ServiceHelper) {
	return {
		entitySchemaName: "UsrRealty",
		attributes: {
            "UsrCommissionUSD": {
                /* The array of configuration objects that define the [UsrCommissionUSD] column dependencies. */
                dependencies: [
                    {
                        /* The [UsrCommissionUSD] column value depends on the [UsrPriceUSD] and [UsrOfferType] column values. */
                        columns: ["UsrPriceUSD", "UsrOfferType"],
                        /* The handler method that is called when the [UsrPriceUSD] or [UsrOfferType] column value changes. */
                        methodName: "calculateCommission"
                    }
                ]
            },
			"UsrOfferType": {
				lookupListConfig: {
					columns: ["UsrCoeff"]
				}
			},
			"AveragePrice": {
				dataValueType: this.Terrasoft.DataValueType.FLOAT,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: 0
			}
		},
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		details: /**SCHEMA_DETAILS*/{
			"Files": {
				"schemaName": "FileDetailV2",
				"entitySchemaName": "UsrRealtyFile",
				"filter": {
					"masterColumn": "Id",
					"detailColumn": "UsrRealty"
				}
			},
			"UsrSchema580de495Detail5ad10659": {
				"schemaName": "UsrRealtyVisitDetailGrid",
				"entitySchemaName": "UsrRealtyVisit",
				"filter": {
					"detailColumn": "UsrRealty",
					"masterColumn": "Id"
				}
			}
		}/**SCHEMA_DETAILS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{
			"UsrComment": {
				"9ac11012-3dc9-4ff7-998f-2ed8bd4cb7db": {
					"uId": "9ac11012-3dc9-4ff7-998f-2ed8bd4cb7db",
					"enabled": true,
					"removed": false,
					"ruleType": 0,
					"property": 0,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 3,
							"leftExpression": {
								"type": 1,
								"attribute": "UsrType"
							},
							"rightExpression": {
								"type": 0,
								"value": "29a11482-312e-4c86-adf1-95d9fd67633a",
								"dataValueType": 10
							}
						}
					]
				}
			},
			"UsrCity": {
				"83a65995-40c7-49d7-9d9e-233d6a12efa3": {
					"uId": "83a65995-40c7-49d7-9d9e-233d6a12efa3",
					"enabled": true,
					"removed": false,
					"ruleType": 1,
					"baseAttributePatch": "Country",
					"comparisonType": 3,
					"autoClean": true,
					"autocomplete": true,
					"type": 1,
					"attribute": "UsrCountry"
				}
			}
		}/**SCHEMA_BUSINESS_RULES*/,
		methods: {
			
			asyncValidate: function(callback, scope) {
				this.callParent([
						function(response) {
					if (!this.validateResponse(response)) {
						return;
					}
					this.validateRealtyData(function(response) {
						if (!this.validateResponse(response)) {
							return;
						}
						callback.call(scope, response);
					}, this);
				}, this]);
			},

			validateRealtyData: function(callback, scope) {
				// create query for server side
				var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "UsrRealty"
				});
				esq.addAggregationSchemaColumn("UsrPriceUSD", Terrasoft.AggregationType.SUM, "PriceSum");
				var saleOfferTypeId = "d61c053f-0d47-4baa-912c-53811a404103";
				var saleFilter = esq.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
							"UsrOfferType", saleOfferTypeId);
				esq.filters.addItem(saleFilter);
				// run query
				esq.getEntityCollection(function(response) {
					if (response.success && response.collection) {
						var sum = 0;
						var items = response.collection.getItems();
						if (items.length > 0) {
							sum = items[0].get("PriceSum");
						}
						var max = 10000000000;
						if (sum > max) {
							if (callback) {
								callback.call(this, {
									success: false,
									message: "You cannot save, because sum = " + sum + " is bigger than " + max
								});
							}
						} else
						if (callback) {
							callback.call(scope, {
								success: true
							});
						}
					}
				}, this);
			},
			
			
            setValidationConfig: function() {
                /* Call the initialization of the parent view model's validators. */
                this.callParent(arguments);
                /* Add the dueDateValidator() validator method for the [DueDate] column. */
                this.addColumnValidator("UsrPriceUSD", this.positiveValueValidator);
                this.addColumnValidator("UsrAreaSqft", this.positiveValueValidator);
            },
			
			positiveValueValidator: function(value, column) {
				var msg = "";
				//var price = this.get("UsrPriceUSD");
				if (value < 0) {
					msg = this.get("Resources.Strings.ValueMustBeGreaterThanZero");
				}
                return {
                    /* The validation error message. */
                    invalidMessage: msg
                };
			},
			
            onEntityInitialized: function() {
                /* Call the parent implementation of the method. */
                this.callParent(arguments);
                /* Call the handler method that calculates the [UsrCommissionUSD] column value. */
                this.calculateCommission();
				this.calcAveragePrice();
            },
			
			calculateCommission: function() {
				var price = this.get("UsrPriceUSD");
				if (!price) {
					price = 0;
				}
				var coeff = 0;				
				var offerTypeObject = this.get("UsrOfferType");
				if (offerTypeObject) {
					coeff = offerTypeObject.UsrCoeff;
				}
				var result = price * coeff;
				this.set("UsrCommissionUSD", result);
			},
			
           calcAveragePrice: function() {
				var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
				    rootSchemaName: "UsrRealty"
				});

				esq.addAggregationSchemaColumn("UsrPriceUSD", Terrasoft.AggregationType.AVG, "AvgPriceUSD");
				esq.addAggregationSchemaColumn("Id", Terrasoft.AggregationType.COUNT, "RecordsCount");

				var realtyTypeObject = this.get("UsrType");
				if (realtyTypeObject) {
					var realtyTypeId = realtyTypeObject.value;
					var filterRealtyType = esq.createColumnFilterWithParameter(
						Terrasoft.ComparisonType.EQUAL, "UsrType", realtyTypeId);
					esq.filters.addItem(filterRealtyType);
				}
				var realtyOfferTypeObject = this.get("UsrOfferType");
				if (realtyOfferTypeObject) {
					var offerTypeId = realtyOfferTypeObject.value;
					var filterRealtyOfferType = esq.createColumnFilterWithParameter(
						Terrasoft.ComparisonType.EQUAL, "UsrOfferType", offerTypeId);
					esq.filters.addItem(filterRealtyOfferType);
				}
			    this.console.log("1");
				esq.getEntityCollection(this.getAvgPriceDataResult, this);
			    this.console.log("2");
				// 

            },
            getAvgPriceDataResult: function(response) {
			    this.console.log("3");
				var result = 0;
				var count = 0;
				if (response.success) {
				    Terrasoft.each(response.collection.getItems(), function(item) {
				        result = item.values.AvgPriceUSD;
				        count = item.values.RecordsCount;
				        }, this);
				    var textMessage = this.get("Resources.Strings.AvgResultMessage") + result + ", " + count + " " +
				    	this.get("Resources.Strings.RecordsCountMessage");
					this.set("AveragePrice", result);
				    this.console.log(textMessage);
				}
            },
			
			init: function() {
 				this.callParent(arguments);
				// Registering of messages
    				this.sandbox.registerMessages(this.messages);
			},
			
			onMyButtonClick: function() {
				this.console.log("MyButton pressed.");
				this.showInformationDialog("Button was pressed.");
				var result = this.sandbox.publish("MyMessageCode", null, []);
				this.console.log("Subscriber result: " + result);
			},
			
			getMyButtonEnabled: function() {
				var result = true;
				var name = this.get("UsrName");
				if (!name) {
					result = false;
				}
				return result;
			},
			onRunWebServiceButtonClick: function() {
				var typeObject = this.get("UsrType");
				if (!typeObject) {
					return;
				}
				var typeId = typeObject.value;
				var offerTypeObject = this.get("UsrOfferType");
				if (!offerTypeObject) {
					return;
				}
				var offerTypeId = offerTypeObject.value;
				var serviceData = {
					realtyTypeId: typeId,
					realtyOfferTypeId: offerTypeId
				};				
				this.console.log("1");
				ServiceHelper.callService("RealtyService", "GetTotalAmountByTypeId", this.getWebServiceResult, serviceData, this);
				this.console.log("2");
			},
			getWebServiceResult: function(response, success) {
				this.console.log("3");
				this.Terrasoft.showInformation("Total amount by typeId: " + response.GetTotalAmountByTypeIdResult);
			}

		},
		messages: {
			"MyMessageCode": {
        		mode: Terrasoft.MessageMode.PTP,
        		direction: Terrasoft.MessageDirectionType.PUBLISH
		    },
		},
		
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "UsrNamedecb8d49-2ecd-48cc-924e-397d4332fefd",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrName",
					"enabled": true
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "FLOAT9b30c080-0af3-488f-ae2b-8d1756255f92",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrPriceUSD",
					"enabled": true
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "FLOAT050a718e-6b98-4089-a9a5-cf6a0d00350d",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrAreaSqft",
					"enabled": true
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "MyButton",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 4,
						"layoutName": "ProfileContainer"
					},
					"itemType": 5,
					"caption": {
						"bindTo": "Resources.Strings.MyButtonCaption"
					},
					"click": {
						"bindTo": "onMyButtonClick"
					},
					"enabled": {
						"bindTo": "getMyButtonEnabled"
					},
					"style": "green"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "RunWebServiceButton",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 4,
						"layoutName": "ProfileContainer"
					},
					"itemType": 5,
					"caption": {
						"bindTo": "Resources.Strings.RunWebServiceButtonCaption"
					},
					"click": {
						"bindTo": "onRunWebServiceButtonClick"
					},
					"style": "red"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 4
			},			
			{
				"operation": "insert",
				"name": "MyAvgPriceComponentName",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 5,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "AveragePrice",
					"enabled": false,
					"caption": {
						"bindTo": "Resources.Strings.AvgPriceVirtualColumnCaption"
					}
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 5
			},
			
			{
				"operation": "insert",
				"name": "FLOATc6f26167-d7c8-4b84-b65f-38e34de94963",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 3,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrCommissionUSD",
					"enabled": false
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "insert",
				"name": "LOOKUP5eb81c36-1027-4d4d-824f-b40ef19bf160",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "UsrType",
					"tip": {
						"content": {
							"bindTo": "Resources.Strings.LOOKUP5eb81c3610274d4d824fb40ef19bf160Tip"
						}
					},
					"enabled": true,
					"contentType": 3
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "LOOKUP9c5f5106-6bee-4ca6-aba9-25863a80f333",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "UsrOfferType",
					"enabled": true,
					"contentType": 3
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "STRING76b4f90b-f3eb-49e8-a598-b2f841cf04b8",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Header"
					},
					"bindTo": "UsrComment",
					"enabled": true,
					"contentType": 0
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "LOOKUP2867cb78-2cc5-49c3-8200-9aca0ebb4c50",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "Header"
					},
					"bindTo": "UsrCountry",
					"enabled": true,
					"contentType": 5
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "LOOKUPf702e80f-bf36-4632-877b-27b0d7132837",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 2,
						"layoutName": "Header"
					},
					"bindTo": "UsrCity",
					"enabled": true,
					"contentType": 5
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "Tabb847dd7fTabLabel",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tabb847dd7fTabLabelTabCaption"
					},
					"items": [],
					"order": 0
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrSchema580de495Detail5ad10659",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "Tabb847dd7fTabLabel",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NotesAndFilesTab",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.NotesAndFilesTabCaption"
					},
					"items": [],
					"order": 1
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Files",
				"values": {
					"itemType": 2
				},
				"parentName": "NotesAndFilesTab",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NotesControlGroup",
				"values": {
					"itemType": 15,
					"caption": {
						"bindTo": "Resources.Strings.NotesGroupCaption"
					},
					"items": []
				},
				"parentName": "NotesAndFilesTab",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Notes",
				"values": {
					"bindTo": "UsrNotes",
					"dataValueType": 1,
					"contentType": 4,
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 24
					},
					"labelConfig": {
						"visible": false
					},
					"controlConfig": {
						"imageLoaded": {
							"bindTo": "insertImagesToNotes"
						},
						"images": {
							"bindTo": "NotesImagesCollection"
						}
					}
				},
				"parentName": "NotesControlGroup",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "merge",
				"name": "ESNTab",
				"values": {
					"order": 2
				}
			}
		]/**SCHEMA_DIFF*/
	};
});
