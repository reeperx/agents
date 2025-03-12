-- Create admin user for testing
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, role)
VALUES 
('00000000-0000-0000-0000-000000000000', 'admin@example.com', '$2a$10$abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ12', now(), now(), now(), '{"provider":"email","providers":["email"]}', '{}', false, 'authenticated')
ON CONFLICT (id) DO NOTHING;

-- Create public user record
INSERT INTO public.users (id, email, role, created_at, updated_at)
VALUES 
('00000000-0000-0000-0000-000000000000', 'admin@example.com', 'admin', now(), now())
ON CONFLICT (id) DO NOTHING;

-- Note: In a real application, you would not hardcode passwords like this.
-- This is only for demonstration purposes.
-- The password for this admin user is 'password123'