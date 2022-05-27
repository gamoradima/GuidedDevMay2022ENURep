 namespace Terrasoft.Configuration
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Terrasoft.Configuration.Reporting.FastReport;
    using Terrasoft.Core;
    using Terrasoft.Core.Entities;
    using Terrasoft.Core.Factories;

    #region Class: RealtyListReportDataProvider

    [DefaultBinding(typeof(IFastReportDataSourceDataProvider), Name = "RealtyListReportDataProvider")]
    public class RealtyListReportDataProvider : IFastReportDataSourceDataProvider
    {

        #region Fields: Private

        private readonly Guid _realtyEntitySchemaUId = new Guid("F2FCBBF1-0ACC-4D42-B929-41624B67C835");

        #endregion

        #region Methods: Private

        private IEnumerable<IReadOnlyDictionary<string, object>> GetRealtyData(UserConnection userConnection,
            Guid entitySchemaUId, IEntitySchemaQueryFilterItem filter) {
            var entitySchema = userConnection.EntitySchemaManager.GetInstanceByUId(entitySchemaUId);
            EntitySchemaQuery query = new EntitySchemaQuery(entitySchema);
            query.AddColumn("UsrName");
            query.AddColumn("UsrPriceUSD");
            query.AddColumn("UsrAreaSqft");
            var typeColumn = query.AddColumn("UsrType.Name");
            var offerTypeColumn = query.AddColumn("UsrOfferType.Name");
            query.Filters.Add(filter);
            EntityCollection collection = query.GetEntityCollection(userConnection);
            var result = new List<IReadOnlyDictionary<string, object>>();
            foreach (var entity in collection) {
                result.Add(new Dictionary<string, object> {
                    ["UsrName"] = entity.GetColumnValue("UsrName").ToString(),
                    ["UsrPriceUSD"] = entity.GetTypedColumnValue<decimal>("UsrPriceUSD"),
                    ["UsrAreaSqft"] = entity.GetTypedColumnValue<decimal>("UsrAreaSqft"),
                    ["TypeName"] = entity.GetColumnValue(typeColumn.Name).ToString(),
                    ["OfferTypeName"] = entity.GetColumnValue(offerTypeColumn.Name).ToString(),
                });
            }
            return result;
        }
        private IEntitySchemaQueryFilterItem ExtractFilterFromParameters(UserConnection userConnection,
            Guid entitySchemaUId, IReadOnlyDictionary<string, object> parameters) {
            var managerItem = userConnection.EntitySchemaManager.GetItemByUId(entitySchemaUId);
            return parameters.ExtractEsqFilterFromReportParameters(userConnection, managerItem.Name) ??
                throw new Exception();
            ;
        }

        #endregion

        #region Methods: Public

        public Task<ReportDataDictionary> GetData(UserConnection userConnection,
            IReadOnlyDictionary<string, object> parameters) {
            var contactFilter = ExtractFilterFromParameters(userConnection, _realtyEntitySchemaUId, parameters);
            var result = new ReportDataDictionary {
                ["Realty"] = GetRealtyData(userConnection, _realtyEntitySchemaUId, contactFilter),
            };
            return Task.FromResult(result);
        }

        #endregion

    }

    #endregion

}

