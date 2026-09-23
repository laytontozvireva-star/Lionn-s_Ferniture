import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();
const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_ANON_KEY);

async function check() {
  const { data, error } = await supabase.from('products').select('id, name, category_id, is_featured').order('created_at', { ascending: false }).limit(5);
  console.log("Recent products:", data);
  const { data: imgData } = await supabase.from('product_images').select('product_id, storage_path').limit(5);
  console.log("Images sample sizes:", imgData?.map(i => ({ id: i.product_id, len: i.storage_path?.length })));
}
check();
