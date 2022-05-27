define("AccountPageV2", [], function() {
	return {
		entitySchemaName: "Account",
		attributes: {},
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{}/**SCHEMA_BUSINESS_RULES*/,
		methods: {},
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "INTEGERf584c1c3-228f-4640-8800-e9d6fdaa54c7",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 1,
						"layoutName": "AccountPageGeneralInfoBlock"
					},
					"bindTo": "UsrWebsiteCode",
					"enabled": true
				},
				"parentName": "AccountPageGeneralInfoBlock",
				"propertyName": "items",
				"index": 2
			}
		]/**SCHEMA_DIFF*/
	};
});
