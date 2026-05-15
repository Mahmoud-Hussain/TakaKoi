import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://egimqnvagindgeukzbgi.supabase.co';
const supabaseKey = 'sb_publishable_wQN0uU__UWkJBR-kQqROQQ_hbFeFIyv';

export const supabase = createClient(supabaseUrl, supabaseKey);
