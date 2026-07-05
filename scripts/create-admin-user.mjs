import bcrypt from 'bcryptjs';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function createAdminUser() {
  const email = 'info@alghahim.co.ke';
  const password = '@MNA2026..';
  const fullName = 'MNA Admin - Alghahim';

  try {
    console.log(`[v0] Creating admin user: ${email}`);

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log('[v0] Password hashed');

    // Insert user
    const { data, error } = await supabase
      .from('admin_users')
      .insert([
        {
          email,
          password_hash: passwordHash,
          full_name: fullName,
          is_active: true,
        },
      ])
      .select();

    if (error) {
      console.error('[v0] Error creating admin user:', error);
      process.exit(1);
    }

    console.log('[v0] Admin user created successfully:', data);
    console.log(`[v0] Email: ${email}`);
    console.log(`[v0] Password: ${password}`);
    process.exit(0);
  } catch (err) {
    console.error('[v0] Error:', err);
    process.exit(1);
  }
}

createAdminUser();
