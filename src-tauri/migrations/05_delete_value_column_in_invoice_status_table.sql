-- DROP: Eliminar la columna `value` de la tabla `invoice_status`

-- Paso 1: Crear un respaldo de la tabla
CREATE TABLE invoice_status_backup AS
SELECT * FROM invoice_status;

-- Paso 2: Eliminar la tabla actual
DROP TABLE invoice_status;

-- Paso 3: Crear la tabla con las columnas necesarias
CREATE TABLE IF NOT EXISTS invoice_status (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Paso 4: Cargar los datos respaldados en la nueva tabla
INSERT INTO invoice_status (
    id,
    name,
    created_at,
    updated_at
)
SELECT
    id,
    name,
    created_at,
    updated_at
FROM
    invoice_status_backup;

-- Paso 5: Eliminar la tabla de respaldo
DROP TABLE invoice_status_backup;