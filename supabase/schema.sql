-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Companies table
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tickets table
CREATE TABLE tickets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_id TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  priority TEXT NOT NULL CHECK (priority IN ('Low', 'Medium', 'High', 'Critical')),
  status TEXT NOT NULL DEFAULT 'Open' CHECK (status IN ('Open', 'In Progress', 'Resolved', 'Closed')),
  created_by UUID REFERENCES users(id),
  assigned_to UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Service Requests table
CREATE TABLE service_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  request_id TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  justification TEXT,
  type TEXT NOT NULL CHECK (type IN ('Software', 'Hardware', 'Access', 'Training', 'Other')),
  priority TEXT NOT NULL DEFAULT 'Medium' CHECK (priority IN ('Low', 'Medium', 'High', 'Urgent')),
  status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'In Review', 'Approved', 'Rejected', 'Completed')),
  requester_id UUID REFERENCES users(id),
  assigned_to UUID REFERENCES users(id),
  company_id UUID REFERENCES companies(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Completed', 'On Hold')),
  company_id UUID REFERENCES companies(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Credentials table
CREATE TABLE credentials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  service TEXT NOT NULL,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  expiry_date DATE,
  notes TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_tickets_assigned_to ON tickets(assigned_to);
CREATE INDEX idx_tickets_status ON tickets(status);
CREATE INDEX idx_service_requests_requester ON service_requests(requester_id);
CREATE INDEX idx_service_requests_company ON service_requests(company_id);
CREATE INDEX idx_credentials_project ON credentials(project_id);

-- Function to generate ticket IDs
CREATE OR REPLACE FUNCTION generate_ticket_id()
RETURNS TRIGGER AS $$
BEGIN
  NEW.ticket_id := 'TKT-' || LPAD(nextval('ticket_seq')::TEXT, 3, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE SEQUENCE IF NOT EXISTS ticket_seq START 1;

CREATE TRIGGER set_ticket_id
  BEFORE INSERT ON tickets
  FOR EACH ROW
  WHEN (NEW.ticket_id IS NULL)
  EXECUTE FUNCTION generate_ticket_id();

-- Function to generate service request IDs
CREATE OR REPLACE FUNCTION generate_request_id()
RETURNS TRIGGER AS $$
BEGIN
  NEW.request_id := 'SR-' || LPAD(nextval('request_seq')::TEXT, 3, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE SEQUENCE IF NOT EXISTS request_seq START 1;

CREATE TRIGGER set_request_id
  BEFORE INSERT ON service_requests
  FOR EACH ROW
  WHEN (NEW.request_id IS NULL)
  EXECUTE FUNCTION generate_request_id();

-- Update timestamp function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_tickets_timestamp
  BEFORE UPDATE ON tickets
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_service_requests_timestamp
  BEFORE UPDATE ON service_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_credentials_timestamp
  BEFORE UPDATE ON credentials
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- =====================
-- INSERT SAMPLE DATA
-- =====================

-- Insert companies
INSERT INTO companies (id, name) VALUES
  ('c1000000-0000-0000-0000-000000000001', 'Acme Corp'),
  ('c1000000-0000-0000-0000-000000000002', 'TechStart Inc'),
  ('c1000000-0000-0000-0000-000000000003', 'Global Systems');

-- Insert users
INSERT INTO users (id, email, name) VALUES
  ('u1000000-0000-0000-0000-000000000001', 'john.doe@company.com', 'John Doe'),
  ('u1000000-0000-0000-0000-000000000002', 'jane.smith@company.com', 'Jane Smith'),
  ('u1000000-0000-0000-0000-000000000003', 'bob.johnson@company.com', 'Bob Johnson'),
  ('u1000000-0000-0000-0000-000000000004', 'alice.brown@company.com', 'Alice Brown'),
  ('u1000000-0000-0000-0000-000000000005', 'current.user@company.com', 'Current User');

-- Insert tickets
INSERT INTO tickets (ticket_id, title, description, priority, status, created_by, assigned_to) VALUES
  ('TKT-001', 'Login Issue', 'Users unable to login after password reset. Getting invalid credentials error.', 'High', 'In Progress', 'u1000000-0000-0000-0000-000000000001', 'u1000000-0000-0000-0000-000000000005'),
  ('TKT-002', 'Database Connection Error', 'Production database showing connection timeout errors intermittently.', 'Critical', 'Open', 'u1000000-0000-0000-0000-000000000002', 'u1000000-0000-0000-0000-000000000005'),
  ('TKT-003', 'UI Bug on Dashboard', 'Charts not rendering properly on Safari browser.', 'Medium', 'Resolved', 'u1000000-0000-0000-0000-000000000003', 'u1000000-0000-0000-0000-000000000005'),
  ('TKT-004', 'Email Notifications Delayed', 'Email notifications are being delivered with 30+ minute delays.', 'High', 'In Progress', 'u1000000-0000-0000-0000-000000000004', 'u1000000-0000-0000-0000-000000000001'),
  ('TKT-005', 'Report Export Failed', 'PDF export functionality throwing 500 error for large reports.', 'Medium', 'Open', 'u1000000-0000-0000-0000-000000000005', 'u1000000-0000-0000-0000-000000000002');

-- Insert service requests
INSERT INTO service_requests (request_id, title, description, justification, type, priority, status, requester_id, assigned_to, company_id) VALUES
  ('SR-001', 'New Software License - Adobe CC', 'Need Adobe Creative Cloud license for design team.', 'Required for marketing materials and UI design work.', 'Software', 'Medium', 'Pending', 'u1000000-0000-0000-0000-000000000001', NULL, 'c1000000-0000-0000-0000-000000000001'),
  ('SR-002', 'Hardware Upgrade - Laptop', 'Request for new MacBook Pro for development work.', 'Current laptop is 5 years old and struggling with development tools.', 'Hardware', 'High', 'Approved', 'u1000000-0000-0000-0000-000000000002', 'u1000000-0000-0000-0000-000000000004', 'c1000000-0000-0000-0000-000000000001'),
  ('SR-003', 'VPN Access Request', 'Need VPN access for remote work.', 'Working remotely and need secure access to internal systems.', 'Access', 'High', 'In Review', 'u1000000-0000-0000-0000-000000000003', 'u1000000-0000-0000-0000-000000000005', 'c1000000-0000-0000-0000-000000000002'),
  ('SR-004', 'Training Request - AWS Certification', 'Request for AWS Solutions Architect training and certification.', 'Moving to cloud infrastructure, need certified team members.', 'Training', 'Medium', 'Completed', 'u1000000-0000-0000-0000-000000000004', 'u1000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000002'),
  ('SR-005', 'Database Access', 'Need read access to production database for reporting.', 'Required for monthly analytics reports.', 'Access', 'Medium', 'Approved', 'u1000000-0000-0000-0000-000000000005', 'u1000000-0000-0000-0000-000000000003', 'c1000000-0000-0000-0000-000000000001'),
  ('SR-006', 'New Monitor Setup', 'Request for dual monitor setup.', 'Improve productivity for data analysis work.', 'Hardware', 'Low', 'Pending', 'u1000000-0000-0000-0000-000000000001', NULL, 'c1000000-0000-0000-0000-000000000003'),
  ('SR-007', 'Slack Enterprise License', 'Upgrade to Slack Enterprise for better security features.', 'Need advanced security and compliance features.', 'Software', 'High', 'In Review', 'u1000000-0000-0000-0000-000000000002', 'u1000000-0000-0000-0000-000000000005', 'c1000000-0000-0000-0000-000000000003'),
  ('SR-008', 'Security Training', 'Cybersecurity awareness training for team.', 'Annual security compliance requirement.', 'Training', 'Medium', 'Completed', 'u1000000-0000-0000-0000-000000000003', 'u1000000-0000-0000-0000-000000000004', 'c1000000-0000-0000-0000-000000000002');

-- Insert projects
INSERT INTO projects (id, name, description, status, company_id) VALUES
  ('p1000000-0000-0000-0000-000000000001', 'Project Alpha - CRM System', 'Customer relationship management system implementation', 'Active', 'c1000000-0000-0000-0000-000000000001'),
  ('p1000000-0000-0000-0000-000000000002', 'Project Beta - E-commerce Platform', 'New e-commerce platform development', 'Active', 'c1000000-0000-0000-0000-000000000002'),
  ('p1000000-0000-0000-0000-000000000003', 'Project Gamma - Mobile App', 'iOS and Android mobile application', 'Active', 'c1000000-0000-0000-0000-000000000003'),
  ('p1000000-0000-0000-0000-000000000004', 'Project Delta - Data Analytics', 'Business intelligence dashboard', 'On Hold', 'c1000000-0000-0000-0000-000000000001');

-- Insert credentials
INSERT INTO credentials (project_id, service, username, password, expiry_date, notes, created_by) VALUES
  ('p1000000-0000-0000-0000-000000000001', 'AWS Console', 'admin@company.com', 'encrypted_pass_1', '2024-12-31', 'Production environment - Handle with care', 'u1000000-0000-0000-0000-000000000001'),
  ('p1000000-0000-0000-0000-000000000001', 'PostgreSQL Database', 'db_admin', 'encrypted_pass_2', '2024-10-15', 'Main CRM database', 'u1000000-0000-0000-0000-000000000001'),
  ('p1000000-0000-0000-0000-000000000001', 'API Gateway', 'api_user', 'encrypted_pass_3', '2024-11-20', 'REST API access key', 'u1000000-0000-0000-0000-000000000002'),
  ('p1000000-0000-0000-0000-000000000002', 'Stripe Dashboard', 'payments@company.com', 'encrypted_pass_4', '2025-01-15', 'Payment processing - Live mode', 'u1000000-0000-0000-0000-000000000002'),
  ('p1000000-0000-0000-0000-000000000002', 'Admin Panel', 'ecom_admin', 'encrypted_pass_5', '2024-09-30', 'Backend admin access', 'u1000000-0000-0000-0000-000000000003'),
  ('p1000000-0000-0000-0000-000000000002', 'Shopify API', 'shop_api_key', 'encrypted_pass_6', '2025-03-01', 'Product sync integration', 'u1000000-0000-0000-0000-000000000003'),
  ('p1000000-0000-0000-0000-000000000003', 'Firebase Console', 'mobile@company.com', 'encrypted_pass_7', '2024-12-01', 'Mobile backend services', 'u1000000-0000-0000-0000-000000000004'),
  ('p1000000-0000-0000-0000-000000000003', 'App Store Connect', 'developer@company.com', 'encrypted_pass_8', '2025-03-15', 'iOS app deployment', 'u1000000-0000-0000-0000-000000000004'),
  ('p1000000-0000-0000-0000-000000000003', 'Google Play Console', 'android@company.com', 'encrypted_pass_9', '2025-02-28', 'Android app deployment', 'u1000000-0000-0000-0000-000000000004'),
  ('p1000000-0000-0000-0000-000000000004', 'Tableau Server', 'analytics_user', 'encrypted_pass_10', '2024-08-31', 'BI Dashboard access', 'u1000000-0000-0000-0000-000000000005');

-- Enable Row Level Security (optional - uncomment if needed)
-- ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE service_requests ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE credentials ENABLE ROW LEVEL SECURITY;
