/* Migration 0002: Form Configurations */
CREATE TABLE IF NOT EXISTS form_configs (
    form_key VARCHAR(255) PRIMARY KEY,
    module_source VARCHAR(255) NOT NULL,
    industry VARCHAR(255),
    version INTEGER NOT NULL DEFAULT 1,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    schema_json JSON NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
