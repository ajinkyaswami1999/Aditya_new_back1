import { createClient } from '@supabase/supabase-js';

// Server-side Supabase configuration
// Uses service role key - server-side only, bypasses RLS
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Admin client for server-side operations with full privileges
export const supabaseAdmin = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null;

// Client instance for server-side read operations (respects RLS)
export const supabaseServerClient = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null;

// Check if Supabase is properly configured on server side
export const isSupabaseServerConfigured = () => {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL && 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
};

// Test Supabase connection
export const testSupabaseConnection = async (): Promise<boolean> => {
  try {
    if (!supabaseServerClient) {
      return false;
    }
    
    const { error } = await supabaseServerClient
      .from('projects')
      .select('count')
      .limit(1);
    
    return !error;
  } catch (error) {
    console.log('Supabase connection test failed (this is normal if not configured):', error);
    return false;
  }
};