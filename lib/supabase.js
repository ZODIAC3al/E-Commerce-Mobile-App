import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);


const fetchProfiles = async () => {
  const { data, error } = await supabase.from("profiles").select("*");

  if (error) {
    console.error("❌ Error fetching profiles:", error.message);
  } else if (data.length === 0) {
    console.warn("⚠️ No profiles found in the database.");
  } else {
    console.log("✅ Profiles:", data);
  }
};

const fetchDeals = async () => {
  const { data, error } = await supabase.from("deals").select("*");
  if (error) {
    console.error("Error fetching deals:", error.message);
  } else {
    console.log("Deals:", data);
  }
};

fetchProfiles();
fetchDeals();
