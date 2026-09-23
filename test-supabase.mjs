import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.log('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testUpload() {
  console.log(`Connecting to: ${supabaseUrl}`);
  console.log('Testing upload to product-images...');
  
  const { data, error } = await supabase.storage
    .from('product-images')
    .upload('test-upload.txt', 'Hello World', {
      contentType: 'text/plain',
      upsert: true
    });

  if (error) {
    console.error('Upload Error:', error);
  } else {
    console.log('Upload Success:', data);
    
    // Test delete to clean up
    const { error: delErr } = await supabase.storage
      .from('product-images')
      .remove(['test-upload.txt']);
      
    if (delErr) console.error('Delete Error:', delErr);
    else console.log('Cleanup successful');
  }
}

testUpload();
