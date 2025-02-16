import { DataTableRow } from "@/components/shared/DataTable/DataTable";
import { ProductData, ProductDynamicValues } from "@/definitions/data";

export const productsRows = (
    products: Array<ProductData & ProductDynamicValues>,
): DataTableRow<ProductData & ProductDynamicValues>[] => {
    return products.map((product) => ({
        field: product,
        render: ({ colName, field }) => {
            if (colName === "code") {
                return <div className="text-center">{field.code}</div>;
            }

            if (colName === "name") {
                return <div className="text-center">{field.name}</div>;
            }

            if (colName === "purchase_usd") {
                return <div className="text-center">{field.purchase_usd}</div>;
            }

            if (colName === "purchase_bs") {
                return <div className="text-center">{field.purchase_bs}</div>;
            }

            if (colName === "iva") {
                return <div className="text-center">{field.iva}</div>;
            }

            if (colName === "sale_usd") {
                return <div className="text-center">{field.sale_usd}</div>;
            }

            if (colName === "sale_bs") {
                return <div className="text-center">{field.sale_bs}</div>;
            }

            if (colName === "revenue_usd") {
                return <div className="text-center">${field.revenue_usd}</div>;
            }

            if (colName === "revenue_bs") {
                return <div className="text-center">Bs. {field.revenue_bs}</div>;
            }

            if (colName === "quantity") {
                return (
                    <div className="text-center">
                        {field.quantity} {field.unit}
                    </div>
                );
            }

            if (colName === "category_id") {
                return (
                    <div className="text-center">
                        {field.quantity} {field.category}
                    </div>
                );
            }
        },
    }));
};
