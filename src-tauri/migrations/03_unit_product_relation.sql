-- Alter relation: Relación entre unidades de medidas y productos

-- Paso 1: Crear una tabla temporal para copiar los datos de la tabla `products`
CREATE TABLE products_backup AS
SELECT * FROM products;

-- Paso 2: Eliminar la tabla `products`
DROP TABLE products;

-- Paso 3: Crear la tabla `products` con la restricción de clave foránea
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(100) NOT NULL UNIQUE,
    category_id INTEGER,
    purchase_usd VARCHAR(50) NOT NULL,
    sale_usd VARCHAR(50) NOT NULL,
    purchase_bs VARCHAR(50) NOT NULL,
    sale_bs VARCHAR(50) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 0,
    unit_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE,
    FOREIGN KEY (unit_id) REFERENCES measurement_units (id) ON DELETE SET NULL
);

-- Paso 4: Restaurar los datos desde la tabla temporal
INSERT INTO products (
    id,
    name,
    code,
    category_id,
    purchase_usd,
    sale_usd,
    purchase_bs,
    sale_bs,
    created_at,
    updated_at
)
SELECT
    id,
    name,
    code,
    category_id,
    purchase_usd,
    sale_usd,
    purchase_bs,
    sale_bs,
    created_at,
    updated_at
FROM
    products_backup;

-- Paso 5: Eliminar la tabla temporal
DROP TABLE products_backup;