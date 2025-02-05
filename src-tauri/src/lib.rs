use tauri_plugin_sql::{Migration, MigrationKind};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let migrations = vec![
        Migration {
            version: 1,
            description: "init",
            sql: include_str!("../migrations/01_init.sql"),
            kind: MigrationKind::Up,
        },
        Migration {
            version: 2,
            description: "unit_quantity_product",
            sql: include_str!("../migrations/02_unit_quantity_product.sql"),
            kind: MigrationKind::Up,
        },
        Migration {
            version: 3,
            description: "unit_product_relation",
            sql: include_str!("../migrations/03_unit_product_relation.sql"),
            kind: MigrationKind::Up,
        },
        Migration {
            version: 4,
            description: "delete_unnecessary_columns",
            sql: include_str!("../migrations/04_delete_unnecessary_columns.sql"),
            kind: MigrationKind::Up,
        },
        Migration {
            version: 5,
            description: "delete_value_column_in_invoice_status_table",
            sql: include_str!("../migrations/05_delete_value_column_in_invoice_status_table.sql"),
            kind: MigrationKind::Up,
        },
        Migration {
            version: 6,
            description: "product_iva",
            sql: include_str!("../migrations/06_product_iva.sql"),
            kind: MigrationKind::Up,
        },
        Migration {
            version: 7,
            description: "product_revenue",
            sql: include_str!("../migrations/07_product_revenue.sql"),
            kind: MigrationKind::Up,
        },
        Migration {
            version: 8,
            description: "clear_products_table",
            sql: include_str!("../migrations/08_clear_products_table.sql"),
            kind: MigrationKind::Up,
        },
    ];
    tauri::Builder::default()
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations("sqlite:datiles.db", migrations)
                .build(),
        )
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
