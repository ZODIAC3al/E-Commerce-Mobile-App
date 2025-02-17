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
  useToast,
  useColorModeValue,
} from "native-base";
import { supabase } from "../../lib/supabase";
import { router } from "expo-router";
import { MotiView, AnimatePresence } from "moti";
import { useShowToast } from "../../components/showToast";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const showToast = useShowToast(); // Initialize toast

  // Dark & Light Mode Colors
  const bgColor = useColorModeValue("gray.100", "gray.900");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const inputBg = useColorModeValue("white", "gray.800");
  const buttonBg = useColorModeValue("blue.500", "blue.300");
  const buttonPressedBg = useColorModeValue("blue.700", "blue.400");

  const handleSignup = async () => {
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Sign up the user
      const { error: signupError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signupError) {
        setError(signupError.message);
      } else {
        // Show success toast
        showToast(
          "Signup Successfully",
          "Your account has been created successfully. Get ready to explore!",
          "success"
        );

        // Log in the user immediately
        const { error: loginError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (loginError) {
          setError(loginError.message);
        } else {
          router.push("/(tabs)/Home");
        }
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Signup error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box flex={1} p={6} justifyContent="center" bg={bgColor}>
      <AnimatePresence>
        <MotiView
          from={{ opacity: 0, translateY: 50 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 500 }}
        >
          <VStack space={5} alignItems="center">
            {/* Title */}
            <Text fontSize="2xl" bold color={textColor} mb={4}>
              Create Your Account
            </Text>

            {/* Error Message */}
            {error && (
              <MotiView
                from={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", delay: 100 }}
              >
                <Text color="red.500" textAlign="center" mb={4}>
                  {error}
                </Text>
              </MotiView>
            )}

            {/* Email Input */}
            <MotiView
              from={{ opacity: 0, translateX: -20 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ type: "timing", duration: 500, delay: 200 }}
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
                borderRadius="md"
                py={3}
                px={4}
                color={textColor}
              />
            </MotiView>

            {/* Password Input */}
            <MotiView
              from={{ opacity: 0, translateX: 20 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ type: "timing", duration: 500, delay: 300 }}
            >
              <Input
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                variant="filled"
                secureTextEntry
                w="100%"
                bg={inputBg}
                borderRadius="md"
                py={3}
                px={4}
                color={textColor}
              />
            </MotiView>

            {/* Signup Button */}
            <MotiView
              from={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", delay: 400 }}
            >
              <Button
                onPress={handleSignup}
                isLoading={loading}
                w="100%"
                bg={buttonBg}
                _pressed={{ bg: buttonPressedBg }}
                borderRadius="md"
                py={3}
              >
                {loading ? <Spinner color="white" /> : "Sign Up"}
              </Button>
            </MotiView>

            {/* Login Link */}
            <MotiView
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: "timing", duration: 500, delay: 500 }}
            >
              <Pressable onPress={() => router.push("Login")}>
                <Text color="blue.600" mt={4}>
                  Already have an account?{" "}
                  <Text fontWeight="bold" color="blue.700">
                    Log in
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
