import React, { useState } from "react";
import {
  Box,
  Input,
  Button,
  VStack,
  Text,
  Pressable,
  Spinner,
  Center,
  useColorModeValue,
  useColorMode
} from "native-base";
import { supabase } from "../../lib/supabase";
import { router } from "expo-router";
import { MotiView, AnimatePresence } from "moti";
import { useShowToast } from "../../components/showToast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { colorMode } = useColorMode();

  // Dynamic Colors for Dark & Light Mode
  const bgColor = useColorModeValue("#F5F5F5", "#121212");
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("black", "white");
  const inputBg = useColorModeValue("gray.200", "gray.700");
  const placeholderColor = useColorModeValue("gray.500", "gray.400");
  const buttonBg = useColorModeValue("#1E88E5", "#42A5F5");
  const buttonPressedBg = useColorModeValue("#1565C0", "#0D47A1");
  const linkColor = useColorModeValue("blue.600", "blue.400");
  const showToast = useShowToast(); // Initialize toast

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      console.log("Attempting login with:", email, password);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      console.log("Login response:", data, error);

      if (error) {
        setError(error.message || "Invalid email or password. Please try again.");
      } else {
        showToast(
          "Login Successfully",
          "You have successfully logged in",
          "success"
        );
        router.replace("Home");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box flex={1} p={6} justifyContent="center" bg={bgColor}>
      <AnimatePresence>
        {/* Animated Login Container */}
        <MotiView
          from={{ opacity: 0, translateY: 50 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "spring", duration: 600, damping: 15 }}
        >
          <VStack space={5} alignItems="center">
            {/* Welcome Text */}
            <MotiView
              from={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", delay: 100 }}
            >
              <Text fontSize="2xl" bold color={textColor} mb={4}>
                Welcome Back!
              </Text>
            </MotiView>

            {/* Error Message with Smooth Animation */}
            {error ? (
              <MotiView
                from={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "timing", duration: 300 }}
              >
                <Text color="red.500" textAlign="center" mb={4}>
                  {error}
                </Text>
              </MotiView>
            ) : null}

            {/* Email Input */}
            <MotiView
              from={{ opacity: 0, translateX: -20 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ type: "spring", delay: 200 }}
            >
              <Input
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                variant="filled"
                keyboardType="email-address"
                autoCapitalize="none"
                w="100%"
                bg={inputBg}
                borderRadius="xl"
                py={3}
                px={4}
                color={textColor}
                placeholderTextColor={placeholderColor}
              />
            </MotiView>

            {/* Password Input */}
            <MotiView
              from={{ opacity: 0, translateX: 20 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ type: "spring", delay: 300 }}
            >
              <Input
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                variant="filled"
                secureTextEntry
                w="100%"
                bg={inputBg}
                borderRadius="xl"
                py={3}
                px={4}
                color={textColor}
                placeholderTextColor={placeholderColor}
              />
            </MotiView>

            {/* Login Button */}
            <MotiView
              from={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", delay: 400 }}
            >
              <Button
                onPress={handleLogin}
                isLoading={loading}
                w="100%"
                bg={buttonBg}
                _pressed={{ bg: buttonPressedBg }}
                borderRadius="xl"
                py={3}
              >
                {loading ? <Spinner color="white" /> : "Login"}
              </Button>
            </MotiView>

            {/* Sign Up Link with Animated Effect */}
            <MotiView
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: "timing", duration: 500, delay: 500 }}
            >
              <Pressable onPress={() => router.push("Signup")}>
                <Text color={linkColor} mt={4}>
                  Don't have an account?{" "}
                  <Text fontWeight="bold" color={linkColor}>
                    Sign up
                  </Text>
                </Text>
              </Pressable>
            </MotiView>
          </VStack>
        </MotiView>
      </AnimatePresence>
    </Box>
  );
}
