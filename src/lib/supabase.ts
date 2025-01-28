import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lunchtable.app';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseKey) {
  throw new Error('Missing Supabase anon key. Please check your environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);