const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

const env = fs.readFileSync('.env', 'utf8').split('\n').reduce((acc, line) => {
  const [key, ...val] = line.split('=');
  if (key && val) acc[key.trim()] = val.join('=').trim().replace(/['"']/g, '');
  return acc;
}, {});

const supabaseUrl = env.REACT_APP_SUPABASE_URL;
const supabaseKey = env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('your-project-ref')) {
  console.log('Keys are still placeholders or missing.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  console.log('Testing connection...');
  const { data: catData, error: catError } = await supabase.from('categories').select('*');
  if (catError) {
    console.error('Error fetching categories:', catError.message);
  } else {
    console.log('Categories table OK, count:', catData.length);
  }

  const { data: prodData, error: prodError } = await supabase.from('products').select('*');
  if (prodError) {
    console.error('Error fetching products:', prodError.message);
  } else {
    console.log('Products table OK, count:', prodData.length);
  }
}

test();
