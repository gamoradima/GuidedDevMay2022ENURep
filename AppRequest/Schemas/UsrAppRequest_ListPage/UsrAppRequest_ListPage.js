define("UsrAppRequest_ListPage", /**SCHEMA_DEPS*/[]/**SCHEMA_DEPS*/, function/**SCHEMA_ARGS*/()/**SCHEMA_ARGS*/ {
	return {
		viewConfigDiff: /**SCHEMA_VIEW_CONFIG_DIFF*/[
			{
				"operation": "merge",
				"name": "SectionContentWrapper",
				"values": {
					"direction": "row",
					"borderRadius": "none",
					"padding": {
						"top": "none",
						"right": "none",
						"bottom": "none",
						"left": "none"
					},
					"justifyContent": "start",
					"gap": "small",
					"wrap": "nowrap"
				}
			},
			{
				"operation": "merge",
				"name": "DataTable",
				"values": {
					"columns": [
						{
							"id": "f252f581-0ccf-44ac-b7c9-c00df2ad9919",
							"code": "PDS_UsrName",
							"caption": "#ResourceString(PDS_UsrName)#",
							"dataValueType": 1,
							"sticky": true
						},
						{
							"id": "b5dbadf6-bbbe-baae-c680-2b165b470c80",
							"code": "PDS_UsrCustomer",
							"caption": "#ResourceString(PDS_UsrCustomer)#",
							"dataValueType": 10
						},
						{
							"id": "dd8b8cf3-ca83-fbe3-f683-1833b2c75100",
							"code": "PDS_UsrColumn4",
							"caption": "#ResourceString(PDS_UsrColumn4)#",
							"dataValueType": 10
						},
						{
							"id": "69265e3a-7aff-b4d1-4451-ec5ba2ccae47",
							"code": "PDS_UsrRegDate",
							"caption": "#ResourceString(PDS_UsrRegDate)#",
							"dataValueType": 7
						},
						{
							"id": "6f52f04d-42a9-f8bf-4173-cbbe0d587f9b",
							"code": "PDS_UsrComment",
							"caption": "#ResourceString(PDS_UsrComment)#",
							"dataValueType": 30
						}
					],
					"layoutConfig": {
						"basis": "100%",
						"width": 300
					},
					"primaryColumnName": "PDS_Id",
					"sorting": "$ItemsSorting | crt.ToDataTableSortingConfig: 'Items'"
				}
			},
			{
				"operation": "insert",
				"name": "FlexContainer_6rfzk09",
				"values": {
					"type": "crt.FlexContainer",
					"direction": "row",
					"items": [],
					"color": "transparent",
					"borderRadius": "none",
					"padding": {
						"top": "medium",
						"right": "none",
						"bottom": "none",
						"left": "large"
					},
					"justifyContent": "start",
					"gap": "small"
				},
				"parentName": "MainContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "FolderTreeActions_p4bcvr1",
				"values": {
					"type": "crt.FolderTreeActions",
					"caption": "#ResourceString(FolderTreeActions_p4bcvr1_caption)#",
					"folderTree": "FolderTree_gm5sany"
				},
				"parentName": "FlexContainer_6rfzk09",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "FolderTree_gm5sany",
				"values": {
					"type": "crt.FolderTree",
					"caption": "#ResourceString(FolderTree_gm5sany_caption)#",
					"sourceSchemaName": "FolderTree",
					"rootSchemaName": "UsrAppRequest",
					"layoutConfig": {
						"width": 328.125
					},
					"classes": [
						"section-folder-tree"
					]
				},
				"parentName": "SectionContentWrapper",
				"propertyName": "items",
				"index": 0
			}
		]/**SCHEMA_VIEW_CONFIG_DIFF*/,
		viewModelConfig: /**SCHEMA_VIEW_MODEL_CONFIG*/{
			"attributes": {
				"Items": {
					"viewModelConfig": {
						"attributes": {
							"PDS_UsrName": {
								"modelConfig": {
									"path": "PDS.UsrName"
								}
							},
							"PDS_UsrCustomer": {
								"modelConfig": {
									"path": "PDS.UsrCustomer"
								}
							},
							"PDS_UsrColumn4": {
								"modelConfig": {
									"path": "PDS.UsrColumn4"
								}
							},
							"PDS_UsrRegDate": {
								"modelConfig": {
									"path": "PDS.UsrRegDate"
								}
							},
							"PDS_UsrComment": {
								"modelConfig": {
									"path": "PDS.UsrComment"
								}
							},
							"PDS_Id": {
								"modelConfig": {
									"path": "PDS.Id"
								}
							}
						}
					},
					"modelConfig": {
						"path": "PDS",
						"pagingConfig": {
							"rowCount": 30
						},
						"sortingConfig": {
							"attributeName": "ItemsSorting",
							"default": [
								{
									"direction": "desc",
									"columnName": "UsrRegDate"
								}
							]
						},
						"filterAttributes": [
							{
								"loadOnChange": true,
								"name": "FolderTree_gm5sany_active_folder_filter"
							},
							{
								"name": "Items_PredefinedFilter",
								"loadOnChange": true
							}
						]
					}
				},
				"ItemsSorting": {},
				"FolderTree_gm5sany_visible": {
					"value": false
				},
				"FolderTree_gm5sany_items": {
					"isCollection": true,
					"viewModelConfig": {
						"attributes": {
							"Id": {
								"modelConfig": {
									"path": "FolderTree_gm5sany_items_DS.Id"
								}
							},
							"Name": {
								"modelConfig": {
									"path": "FolderTree_gm5sany_items_DS.Name"
								}
							},
							"ParentId": {
								"modelConfig": {
									"path": "FolderTree_gm5sany_items_DS.Parent.Id"
								}
							},
							"FilterData": {
								"modelConfig": {
									"path": "FolderTree_gm5sany_items_DS.FilterData"
								}
							}
						}
					},
					"modelConfig": {
						"path": "FolderTree_gm5sany_items_DS",
						"filterAttributes": [
							{
								"name": "FolderTree_gm5sany_items_DS_filter",
								"loadOnChange": true
							}
						]
					},
					"embeddedModel": {
						"name": "FolderTree_gm5sany_items_DS",
						"config": {
							"type": "crt.EntityDataSource",
							"config": {
								"entitySchemaName": "FolderTree"
							}
						}
					}
				},
				"FolderTree_gm5sany_active_folder_id": {},
				"FolderTree_gm5sany_active_folder_name": {},
				"FolderTree_gm5sany_active_folder_filter": {
					"value": {}
				},
				"FolderTree_gm5sany_items_DS_filter": {
					"value": {
						"isEnabled": true,
						"trimDateTimeParameterToDate": false,
						"filterType": 6,
						"logicalOperation": 0,
						"items": {
							"3714ebf4-41a3-9a82-8e8b-039d9ac03ce1": {
								"isEnabled": true,
								"trimDateTimeParameterToDate": false,
								"filterType": 1,
								"comparisonType": 3,
								"leftExpression": {
									"expressionType": 0,
									"columnPath": "EntitySchemaName"
								},
								"rightExpression": {
									"expressionType": 2,
									"parameter": {
										"dataValueType": 1,
										"value": "UsrAppRequest"
									}
								}
							}
						}
					}
				}
			}
		}/**SCHEMA_VIEW_MODEL_CONFIG*/,
		modelConfig: /**SCHEMA_MODEL_CONFIG*/{
			"dataSources": {
				"PDS": {
					"type": "crt.EntityDataSource",
					"hiddenInPageDesigner": true,
					"config": {
						"entitySchemaName": "UsrAppRequest",
						"attributes": {
							"UsrName": {
								"path": "UsrName"
							},
							"UsrCustomer": {
								"path": "UsrCustomer"
							},
							"UsrColumn4": {
								"path": "UsrColumn4"
							},
							"UsrRegDate": {
								"path": "UsrRegDate"
							},
							"UsrComment": {
								"path": "UsrComment"
							}
						}
					},
					"scope": "viewElement"
				}
			}
		}/**SCHEMA_MODEL_CONFIG*/,
		handlers: /**SCHEMA_HANDLERS*/[]/**SCHEMA_HANDLERS*/,
		converters: /**SCHEMA_CONVERTERS*/{}/**SCHEMA_CONVERTERS*/,
		validators: /**SCHEMA_VALIDATORS*/{}/**SCHEMA_VALIDATORS*/
	};
});