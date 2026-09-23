import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();
const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_ANON_KEY);

async function check() {
  const { data: prodData } = await supabase.from('products').select('id, name, price');
  console.log("Products with bad price:", prodData.filter(p => p.price === null || isNaN(p.price) || typeof p.price !== 'number'));
}
check();
