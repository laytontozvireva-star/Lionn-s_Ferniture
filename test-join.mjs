import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();
const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_ANON_KEY);

async function check() {
  const { data: prodData, error: prodError } = await supabase
    .from('products')
    .select(`
      id,
      categories (slug)
    `).limit(2);
  console.log(JSON.stringify(prodData, null, 2));
}
check();
