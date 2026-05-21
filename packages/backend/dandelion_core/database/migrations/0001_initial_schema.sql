/*
  Shared Module Initial Schema (0001)
  Purpose: Define core tables for Leads and Events tracking.
  Target: MySQL (Production Baseline)
*/

CREATE TABLE IF NOT EXISTS leads (
    lead_id VARCHAR(36) PRIMARY KEY,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    last_activity_at DATETIME NOT NULL,
    status VARCHAR(50) NOT NULL,
    priority VARCHAR(50) NOT NULL DEFAULT 'normal',
    lifecycle_stage VARCHAR(50) NOT NULL DEFAULT 'new',
    module_source VARCHAR(255) NOT NULL,
    form_key VARCHAR(255) NOT NULL,
    industry VARCHAR(255),
    contact_name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(255),
    business_name VARCHAR(255),
    website_url VARCHAR(255),
    city VARCHAR(255),
    service_area VARCHAR(255),
    source VARCHAR(255),
    medium VARCHAR(255),
    campaign VARCHAR(255),
    referrer VARCHAR(255),
    landing_path VARCHAR(255),
    summary TEXT,
    consent BOOLEAN NOT NULL DEFAULT FALSE,
    consent_text TEXT,
    consent_at DATETIME,
    custom_fields JSON NOT NULL,
    tags JSON NOT NULL,
    archived_at DATETIME
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS events (
    event_id VARCHAR(36) PRIMARY KEY,
    event_type VARCHAR(255) NOT NULL,
    occurred_at DATETIME NOT NULL,
    lead_id VARCHAR(36),
    session_id VARCHAR(255),
    visitor_id VARCHAR(255),
    path VARCHAR(255),
    referrer VARCHAR(255),
    source VARCHAR(255),
    medium VARCHAR(255),
    campaign VARCHAR(255),
    module_source VARCHAR(255),
    form_key VARCHAR(255),
    metadata JSON NOT NULL, -- P0-2 fix: restore metadata column
    CONSTRAINT fk_events_lead_id FOREIGN KEY (lead_id) REFERENCES leads (lead_id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS lead_notes (
    note_id VARCHAR(36) PRIMARY KEY,
    lead_id VARCHAR(36) NOT NULL,
    created_at DATETIME NOT NULL,
    author VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    visibility VARCHAR(50) NOT NULL DEFAULT 'internal',
    CONSTRAINT fk_notes_lead_id FOREIGN KEY (lead_id) REFERENCES leads (lead_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS notification_logs (
    notification_id VARCHAR(36) PRIMARY KEY,
    lead_id VARCHAR(36),
    event_id VARCHAR(36),
    type VARCHAR(100) NOT NULL,
    channel VARCHAR(50) NOT NULL,
    recipient VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL,
    provider VARCHAR(100),
    provider_message_id VARCHAR(255),
    error_message TEXT,
    created_at DATETIME NOT NULL,
    sent_at DATETIME,
    next_retry_at DATETIME,
    retry_count INTEGER NOT NULL DEFAULT 0,
    payload JSON NOT NULL,
    CONSTRAINT fk_notif_lead_id FOREIGN KEY (lead_id) REFERENCES leads (lead_id) ON DELETE SET NULL,
    CONSTRAINT fk_notif_event_id FOREIGN KEY (event_id) REFERENCES events (event_id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
