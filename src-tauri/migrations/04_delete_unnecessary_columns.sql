-- DROP: Eliminar algunas columnas innecesarias

-- Paso 1: Crear las tablas de respaldo
CREATE TABLE payment_methods_backup AS
SELECT * FROM payment_methods;

CREATE TABLE measurement_units_backup AS
SELECT * FROM measurement_units;

-- Paso 2: Eliminar las tablas
DROP TABLE payment_methods;
DROP TABLE measurement_units;

-- Paso 3: Volver a crear las tablas con solo las columnas necesarias
CREATE TABLE IF NOT EXISTS payment_methods (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    active BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS measurement_units (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Paso 4: Restaurar los datos desde las tablas temporales
INSERT INTO payment_methods (
    id,
    name,
    active,
    created_at,
    updated_at
)
SELECT
    id,
    name,
    active,
    created_at,
    updated_at
FROM
    payment_methods_backup;

INSERT INTO measurement_units (
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
    measurement_units_backup;

--Paso 5: Eliminar las tablas temporales
DROP TABLE payment_methods_backup;
DROP TABLE measurement_units_backup;