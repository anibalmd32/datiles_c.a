import { DataTableCol } from "@/components/shared/DataTable/DataTable";
import { ProductData, ProductDynamicValues } from "@/definitions/data";

export const productsCols: DataTableCol<ProductData & ProductDynamicValues>[] =
  [
      {
          label: "Código",
          name: "code",
          position: "center",
      },
      {
          label: "Nombre",
          name: "name",
          position: "center",
      },
      {
          label: "Precio de compra (USD)",
          name: "purchase_usd",
          position: "center",
      },
      {
          label: "Precio de compra (BS)",
          name: "purchase_bs",
          position: "center",
      },
      {
          label: "IVA",
          name: "iva",
          position: "center",
      },
      {
          label: "Precio de venta (USD)",
          name: "sale_usd",
          position: "center",
      },
      {
          label: "Precio de venta (BS)",
          name: "sale_bs",
          position: "center",
      },
      {
          label: "Ganancia (USD)",
          name: "revenue_usd",
          position: "center",
      },
      {
          label: "Ganancia (BS)",
          name: "revenue_bs",
          position: "center",
      },
      {
          label: "Cantidad",
          name: "quantity",
          position: "center",
      },
      {
          label: "Categoría",
          name: "category_id",
          position: "center",
      },
  ];
