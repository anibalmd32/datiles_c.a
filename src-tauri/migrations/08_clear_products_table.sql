ALTER TABLE products RENAME TO products_old;

CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(100) NOT NULL UNIQUE,
    purchase_usd VARCHAR(50) NOT NULL,
    purchase_bs VARCHAR(50) NOT NULL,
    iva VARCHAR(50) NOT NULL,
    sale_usd VARCHAR(50) NOT NULL,
    revenue_usd VARCHAR(50) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 0,
    category_id INTEGER,
    unit_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE,
    FOREIGN KEY (unit_id) REFERENCES measurement_units (id) ON DELETE SET NULL
);

INSERT INTO products (
    id,
    name,
    code,
    purchase_usd,
    purchase_bs,
    iva,
    sale_usd,
    revenue_usd,
    quantity,
    category_id,
    unit_id,
    created_at,
    updated_at
)
SELECT
    id,
    name,
    code,
    purchase_usd,
    purchase_bs,
    iva,
    sale_usd,
    revenue_usd,
    quantity,
    category_id,
    unit_id,
    created_at,
    updated_at
FROM
    products_old;

DROP TABLE products_old;
