import { SupabaseClient, createClient } from '@supabase/supabase-js';

let client: SupabaseClient | null = null;

export function initSupabase(): void {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

  if(client === null) {
    client = createClient(supabaseUrl, supabaseKey);
  } else {
    throw new Error('Cannot initialize supabase more than once.');
  }
}

export function getSupabase(): SupabaseClient {
  if (client === null) {
    throw new Error('The supabase client was not initialized. Did you forget to call initSupabase() ?');
  }

  return client;
}
