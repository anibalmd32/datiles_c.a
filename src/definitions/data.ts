import { PAYMENT_METHOD } from "./enums";

export type InvoiceData = {
    id: number;
    code: string;
    paymentMethod: PAYMENT_METHOD;
    totalUSD: string;
    totalBS: string;
    date: string;
}
