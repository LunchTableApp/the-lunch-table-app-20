import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://lunchtable.app';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'SLLARSON2009lolurmom';

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials. Please check your configuration.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);