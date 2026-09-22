const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const env = fs.readFileSync('.env', 'utf8').split('\n').reduce((acc, line) => {
  const [key, ...val] = line.split('=');
  if (key && val) acc[key.trim()] = val.join('=').trim().replace(/['"']/g, '');
  return acc;
}, {});

const supabaseUrl = env.REACT_APP_SUPABASE_URL;
const supabaseKey = env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

console.log("--- CREATE ADMIN ACCOUNT ---");
readline.question("Enter Admin Email: ", async (email) => {
  readline.question("Enter Admin Password (min 6 chars): ", async (password) => {
    
    console.log("Signing up user...");
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      console.error("Error creating user:", error.message);
    } else {
      console.log("\nSuccess! User created.");
      console.log("IMPORTANT: Copy this email address. You will need to run the SQL script next to grant this user the 'admin' role.");
      console.log("Email:", data.user?.email || email);
    }
    
    readline.close();
  });
});
