import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { Database } from '../db/database.types';

let client: SupabaseClient<Database> | null = null;

export function initSupabase(): void {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

  if (client === null) {
    client = createClient(supabaseUrl, supabaseKey);
  }
}

export function getSupabase(): SupabaseClient<Database> {
  initSupabase();

  return client as SupabaseClient<Database>;
}
