import { Redirect } from "expo-router";
import { supabase } from "../lib/supabase";
import { useEffect, useState } from "react";

export default function Index() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return null; // You can show a loading spinner here if needed
  }

  // ✅ Fix: Correct redirect paths
  return <Redirect href={session ? "/(tabs)/Home" : "/(auth)/Login"} />;
}
