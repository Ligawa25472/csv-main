import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyAdminUser() {
  try {
    console.log('[v0] Fetching admin users...');

    const { data, error } = await supabase
      .from('admin_users')
      .select('id, email, full_name, is_active, created_at, password_hash')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[v0] Error fetching admin users:', error);
      process.exit(1);
    }

    console.log('[v0] Admin users found:', data?.length || 0);
    
    if (data && data.length > 0) {
      data.forEach((user) => {
        console.log(`
[v0] User:
  - ID: ${user.id}
  - Email: ${user.email}
  - Name: ${user.full_name}
  - Active: ${user.is_active}
  - Created: ${user.created_at}
  - Password Hash: ${user.password_hash ? '✓ Set' : '✗ Missing'}
        `);
      });
    } else {
      console.log('[v0] No admin users found in database');
    }

    process.exit(0);
  } catch (err) {
    console.error('[v0] Error:', err);
    process.exit(1);
  }
}

verifyAdminUser();
