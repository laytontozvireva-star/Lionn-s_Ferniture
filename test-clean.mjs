import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();
const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_ANON_KEY);

async function clean() {
  const { data, error } = await supabase
    .from('product_images')
    .delete()
    .like('storage_path', 'data:image/%');
  
  if (error) {
    console.error("Delete failed:", error);
  } else {
    console.log("Deleted base64 images.");
  }
}
clean();
