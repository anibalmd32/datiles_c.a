import { DataTableRow } from "@/components/shared/DataTable/DataTable";
import { ProductData } from "@/definitions/data";

export const productsRows = (
    products: Array<ProductData>,
): DataTableRow<ProductData>[] => {
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
        },
    }));
};
