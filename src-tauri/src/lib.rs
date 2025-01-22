use tauri_plugin_sql::{Migration, MigrationKind};

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

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
    ];
    tauri::Builder::default()
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations("sqlite:datiles.db", migrations)
                .build(),
        )
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
