export enum INVOICE_STATUS {
    'PAID' = 1,
    'PENDING' = 2,
    'REJECTED' = 3
}

export enum TABLES {
    CATEGORIES = 'categories',
    INVOICE_ITEMS = 'invoice_items',
    INVOICE_STATUS = 'invoice_status',
    INVOICES = 'invoices',
    MEASUREMENT_UNITS = 'measurement_units',
    PAYMENT_METHODS = 'payment_methods',
    PRODUCTS = 'products',
    SALES = 'sales',
    USERS = 'users'
}