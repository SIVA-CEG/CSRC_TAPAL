CREATE DATABASE csrc_tapal;

CREATE TABLE tapals (
  id SERIAL PRIMARY KEY,
  tapal_no VARCHAR(50) UNIQUE NOT NULL,
  acceptance_id VARCHAR(100),
  tapal_date DATE,
  reference_date DATE,
  reference_no VARCHAR(100),
  mh_file_no VARCHAR(100),
  ctdt_category VARCHAR(100),
  document_type VARCHAR(100),
  tapal_from TEXT,
  department VARCHAR(150),
  campus VARCHAR(150),
  amount NUMERIC,
  tapal_mode VARCHAR(100),
  subject TEXT,
  status VARCHAR(50) DEFAULT 'new',
  assigned_to VARCHAR(150),
  assigned_at DATE,
  remarks TEXT,
  despatch_date DATE,
  bill_file VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);