import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();
const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_ANON_KEY);

async function check() {
  const { data: prodData, error: prodError } = await supabase
    .from('products')
    .select(`
      *,
      categories (slug),
      product_images (storage_path)
    `);
  if (prodError) {
    console.error("Fetch failed:", prodError);
  } else {
    console.log("Fetch success! Found", prodData.length, "products.");
  }
}
check();
