import { isSupabaseConfigured, supabase } from '../lib/supabase';

function requireSupabase() {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('The contact service is not configured yet. Please try again later.');
  }
}

export async function submitContactMessage({ name, email, message }) {
  requireSupabase();
  const { error } = await supabase.from('contact_messages').insert({ name, email, message });
  if (error) throw error;
}

export async function submitCustomRequest(request) {
  requireSupabase();
  const { error } = await supabase.from('custom_furniture_requests').insert(request);
  if (error) throw error;
}
