define("UsrDecimalOutputPage", [], function() {
	return {
		entitySchemaName: "",
		attributes: {},
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{}/**SCHEMA_BUSINESS_RULES*/,
		methods: {},
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "Button-955a97f09d2a42619474fc637a92c758",
				"values": {
					"itemType": 5,
					"id": "fa250ee8-3ab1-4871-8228-f30c7d56f553",
					"style": "green",
					"tag": "Button1",
					"caption": {
						"bindTo": "Resources.Strings.Button1ButtonCaption"
					},
					"click": {
						"bindTo": "onSaveButtonClick"
					},
					"enabled": true
				},
				"parentName": "ProcessActionButtons",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "FLOAT906946d3-5110-4900-a017-807379d74387",
				"values": {
					"layout": {
						"colSpan": 8,
						"rowSpan": 1,
						"column": 6,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "UsrFloat1",
					"enabled": false
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 0
			}
		]/**SCHEMA_DIFF*/
	};
});
