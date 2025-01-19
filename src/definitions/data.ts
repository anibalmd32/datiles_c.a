import { PAYMENT_METHOD } from "./enums";

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

export type Product = {
    name: string;
    code: string;
    category_id: number;
    purchase_usd: string;
    sale_usd: string;
    purchase_bs: string;
    sale_bs: string;
}

export type PaymentMethod = {
    name: string;
    value: number;
    active: boolean;
}

export type InvoiceStatus = {
    name: string;
    value: number;
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

export type InvoiceData = {
    id: number;
    code: string;
    paymentMethod: PAYMENT_METHOD;
    totalUSD: string;
    totalBS: string;
    date: string;
}
