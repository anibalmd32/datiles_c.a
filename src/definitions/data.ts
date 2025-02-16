import { INVOICE_STATUS } from "./enums";

export type SharedDataProp = {
  id: number;
  created_at: Date;
  updated_at: Date;
};

export type User = {
  name: string;
  email: string;
  password: string;
};

export type Category = {
  name: string;
};

export type StockMode = {
  name: string;
};

export type MeasurementUnit = {
  name: string;
  stock_mode_id: number;
};

export type Product = {
  name: string;
  purchase_usd: string;
  purchase_bs: string;
  sale_usd: string;
  iva: string;
  category_id: number | null;
  code: string | null;
};

export type ProductDynamicValues = {
  sale_bs: string;
  revenue_bs: string;
};

export type Stock = {
  quantity: number;
  measurement_unit_id: number;
  unit_per_measurement: number | null;
  product_id: number;
};

export type PaymentMethod = {
  name: string;
  active: boolean;
};

export type Invoice = {
  payment_method_id: number;
  code: string;
  status: INVOICE_STATUS;
  total_usd: string;
  total_bs: string;
};

export type Sale = {
  product_id: number;
  quantity: number;
  total_usd: string;
  total_bs: string;
};

export type InvoiceItem = {
  invoice_id: number;
  sale_id: number;
};

export type ShoppingListItem = {
  product_name: string;
  bought_out: boolean;
};

export type TemporalInventory = {
  shopping_list_item_id: number;
  measurement_unit_id: number;
  purchase_usd: string;
  purchase_bs: string;
  quantity: number;
};

export type CategoryData = Category & SharedDataProp;
export type UserData = User & SharedDataProp;
export type StockModeData = StockMode & SharedDataProp;
export type StockData = Stock & SharedDataProp;
export type MeasurementUnitData = MeasurementUnit & SharedDataProp;
export type ProductData = Product & SharedDataProp & CategoryData;
export type PaymentMethodData = PaymentMethod & SharedDataProp;
export type InvoiceData = Invoice & SharedDataProp;
export type SaleData = Sale & SharedDataProp;
export type InvoiceItemData = InvoiceItem & SharedDataProp;
export type ShoppingListItemData = ShoppingListItem & SharedDataProp;
export type TemporalInventoryData = TemporalInventory & SharedDataProp;
