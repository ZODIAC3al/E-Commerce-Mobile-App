import { Stack } from "expo-router";
import { NativeBaseProvider, useColorMode, StorageManager, Box, useColorModeValue } from "native-base";
import { supabase } from "../lib/supabase";
import { useEffect, useState } from "react";
import { CartProvider } from "../Context/CartContext";
import { AuthProvider } from "../Context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "../theme";
import { StatusBar } from "expo-status-bar";

const colorModeManager = {
  get: async () => {
    try {
      return await AsyncStorage.getItem("@color-mode");
    } catch (e) {
      return "light"; // Default mode
    }
  },
  set: async (value) => {
    try {
      await AsyncStorage.setItem("@color-mode", value);
    } catch (e) {
      console.error("Failed to set color mode:", e);
    }
  },
};

export default function RootLayout() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
 const bgColor = useColorModeValue("gray.100", "gray.900");
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

  if (loading) return null; // Show a loading spinner if needed

  return (
 
    <NativeBaseProvider theme={theme} colorModeManager={colorModeManager}>
    <StatusBar style={theme.config.initialColorMode === "dark" ? "dark" : "light"} />
   <Box flex={1}  bgColor={bgColor}>
    <AuthProvider>
          <CartProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(auth)" />
              <Stack.Screen name="(tabs)" />
            </Stack>
          </CartProvider>
    </AuthProvider>
    </Box>
    </NativeBaseProvider>
  );
}