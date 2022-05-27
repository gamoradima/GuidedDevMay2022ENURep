define("UsrAppRequest_FormPage", /**SCHEMA_DEPS*/[]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/()/**SCHEMA_ARGS*/ {
	return {
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"name": "SaveButton",
				"values": {
					"iconPosition": "only-text"
				}
			},
			{
				"operation": "merge",
				"name": "CancelButton",
				"values": {
					"color": "default",
					"iconPosition": "only-text"
				}
			},
			{
				"operation": "merge",
				"name": "CloseButton",
				"values": {
					"iconPosition": "only-text"
				}
			},
			{
				"operation": "merge",
				"name": "ControlGroupContainer",
				"values": {
					"columns": [
						"minmax(64px, 1fr)",
						"minmax(64px, 1fr)",
						"minmax(64px, 1fr)"
					],
					"gap": {
						"columnGap": "large",
						"rowGap": "none"
					},
					"color": "#EDF8CB"
				}
			},
			{
				"operation": "insert",
				"name": "Button_1lypfpa",
				"values": {
					"type": "crt.Button",
					"caption": "#ResourceString(Button_1lypfpa_caption)#",
					"color": "default",
					"disabled": false,
					"clicked": {
						"request": "crt.RunBusinessProcessRequest"
					},
					"iconPosition": "right-icon",
					"icon": "open-button-icon"
				},
				"parentName": "ActionButtonsContainer",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "UsrName",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					},
					"type": "crt.Input",
					"label": "$Resources.Strings.UsrName",
					"control": "$UsrName"
				},
				"parentName": "LeftAreaProfileContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ChartWidget_8nuxvex",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 7
					},
					"type": "crt.ChartWidget",
					"config": {
						"title": "#ResourceString(ChartWidget_8nuxvex_title)#",
						"color": "green",
						"theme": "full-fill",
						"scales": {
							"stacked": false,
							"xAxis": {
								"name": "",
								"formatting": {
									"type": "string",
									"maxLinesCount": 2,
									"maxLineLength": 10
								}
							},
							"yAxis": {
								"name": "",
								"formatting": {
									"type": "number",
									"thousandAbbreviation": {
										"enabled": true
									}
								}
							}
						},
						"series": [
							{
								"color": "violet",
								"type": "horizontal-bar",
								"label": "#ResourceString(ChartWidget_8nuxvex_series_0)#",
								"legend": {
									"enabled": false
								},
								"data": {
									"providing": {
										"schemaName": "SysUserSession",
										"rowCount": 50,
										"sectionBindingColumn": {
											"path": null
										},
										"grouping": {
											"column": {
												"expression": {
													"expressionType": 0,
													"columnPath": "Agent"
												}
											},
											"type": "by-value"
										},
										"aggregation": {
											"column": {
												"expression": {
													"expressionType": 1,
													"functionType": 2,
													"aggregationType": 1,
													"aggregationEvalType": 2,
													"functionArgument": {
														"expressionType": 0,
														"columnPath": "Id"
													}
												}
											}
										},
										"filters": {
											"filter": {
												"items": {
													"columnIsNotNullFilter": {
														"comparisonType": 2,
														"filterType": 2,
														"isEnabled": true,
														"isNull": false,
														"trimDateTimeParameterToDate": false,
														"leftExpression": {
															"expressionType": 0,
															"columnPath": "Agent"
														}
													}
												},
												"logicalOperation": 0,
												"isEnabled": true,
												"filterType": 6,
												"rootSchemaName": "SysUserSession"
											}
										}
									},
									"formatting": {
										"type": "number",
										"decimalSeparator": ".",
										"thousandSeparator": ","
									}
								}
							}
						],
						"seriesOrder": {
							"type": "by-grouping-value",
							"direction": 1
						}
					},
					"sectionBindingColumnRecordId": "$Id"
				},
				"parentName": "LeftAreaContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "DateTimePicker_rx54j3h",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					},
					"type": "crt.DateTimePicker",
					"control": "$DateTimeAttribute_0x5tdxj",
					"label": "$Resources.Strings.DateTimeAttribute_0x5tdxj",
					"labelPosition": "auto",
					"pickerType": "datetime"
				},
				"parentName": "ControlGroupContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ComboBox_0w2bnsd",
				"values": {
					"layoutConfig": {
						"column": 2,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					},
					"type": "crt.ComboBox",
					"loading": false,
					"control": "$LookupAttribute_n6mc6xw",
					"label": "$Resources.Strings.LookupAttribute_n6mc6xw",
					"labelPosition": "auto",
					"isAddAllowed": true,
					"showValueAsLink": true
				},
				"parentName": "ControlGroupContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "ComboBox_tbrdqss",
				"values": {
					"layoutConfig": {
						"column": 3,
						"row": 1,
						"colSpan": 1,
						"rowSpan": 1
					},
					"type": "crt.ComboBox",
					"loading": false,
					"control": "$LookupAttribute_oj5j3l0",
					"label": "$Resources.Strings.LookupAttribute_oj5j3l0",
					"labelPosition": "auto",
					"isAddAllowed": true,
					"showValueAsLink": true
				},
				"parentName": "ControlGroupContainer",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "Input_mi9lta5",
				"values": {
					"layoutConfig": {
						"column": 1,
						"row": 2,
						"colSpan": 3,
						"rowSpan": 2
					},
					"type": "crt.Input",
					"control": "$StringAttribute_122ifg4",
					"label": "$Resources.Strings.StringAttribute_122ifg4",
					"labelPosition": "auto",
					"multiline": true,
					"placeholder": ""
				},
				"parentName": "ControlGroupContainer",
				"propertyName": "items",
				"index": 3
			}
		]/**SCHEMA_VIEW_CONFIG_DIFF*/,
		viewModelConfig: /**SCHEMA_VIEW_MODEL_CONFIG*/{
			"attributes": {
				"UsrName": {
					"modelConfig": {
						"path": "PDS.UsrName"
					}
				},
				"Id": {
					"modelConfig": {
						"path": "PDS.Id"
					}
				},
				"DateTimeAttribute_0x5tdxj": {
					"modelConfig": {
						"path": "PDS.UsrRegDate"
					}
				},
				"LookupAttribute_n6mc6xw": {
					"modelConfig": {
						"path": "PDS.UsrCustomer"
					}
				},
				"LookupAttribute_oj5j3l0": {
					"modelConfig": {
						"path": "PDS.UsrColumn4"
					}
				},
				"StringAttribute_122ifg4": {
					"modelConfig": {
						"path": "PDS.UsrComment"
					}
				}
			}
		}/**SCHEMA_VIEW_MODEL_CONFIG*/,
		modelConfig: /**SCHEMA_MODEL_CONFIG*/{
			"dataSources": {
				"PDS": {
					"type": "crt.EntityDataSource",
					"config": {
						"entitySchemaName": "UsrAppRequest"
					},
					"scope": "page"
				}
			},
			"primaryDataSourceName": "PDS"
		}/**SCHEMA_MODEL_CONFIG*/,
		handlers: /**SCHEMA_HANDLERS*/[]/**SCHEMA_HANDLERS*/,
		converters: /**SCHEMA_CONVERTERS*/{}/**SCHEMA_CONVERTERS*/,
		validators: /**SCHEMA_VALIDATORS*/{}/**SCHEMA_VALIDATORS*/
	};
});