import { createClient } from '@supabase/supabase-js';

// Supabase URL and anon key from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

// Client-side Supabase client (for browser)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side Supabase client for API Route Handlers (no session persistence)
export function createServerSupabaseClient() {
  // Server-side usage: we intentionally omit client-side session persistence options.
  // This avoids needing to cast the options and satisfies the linter.
  return createClient(supabaseUrl, supabaseAnonKey);
}

// Example: get current user
export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data.user;
}
