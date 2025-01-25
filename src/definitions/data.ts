export type SharedDataProp = {
    id: number;
    created_at: Date;
    updated_at: Date;
}

export type User = {
    name: string;
    email: string;
    password: string;
}

export type Category = {
    name: string
}

export type MeasurementUnit = {
    name: string;
}

export type Product = {
    name: string;
    code: string;
    purchase_usd: string;
    sale_usd: string;
    purchase_bs: string;
    sale_bs: string;
    category_id: number | null;
    quantity: number;
    unit_id: number | null;
}

export type PaymentMethod = {
    name: string;
    active: boolean;
}

export type InvoiceStatus = {
    name: string;
}

export type Invoice = {
    payment_method_id: number;
    code: string;
    date: Date;
    status_id: number;
    total_usd: string;
    total_bs: string;
}

export type Sale = {
    product_id: number;
    quantity: number;
    total_usd: string;
    total_bs: string;
}

export type InvoiceItem = {
    invoice_id: number;
    sale_id: number;
}

export type CategoryData = Category & SharedDataProp
export type UserData = User & SharedDataProp
export type MeasurementUnitData = MeasurementUnit & SharedDataProp
export type ProductData = Product & SharedDataProp
export type PaymentMethodData = PaymentMethod & SharedDataProp
export type InvoiceStatusData = InvoiceStatus & SharedDataProp
export type InvoiceData = Invoice & SharedDataProp
export type SaleData = Sale & SharedDataProp
export type InvoiceItemData = InvoiceItem & SharedDataProp
