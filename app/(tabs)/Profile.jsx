import React, { useState } from "react";
import {
  Box,
  Text,
  Button,
  Image,
  VStack,
  Center,
  HStack,
  IconButton,
  Icon,
  useColorMode,
  useColorModeValue,
  Modal,
  FormControl,
  Input,
} from "native-base";
import { useAuth } from "../../Context/AuthContext";
import { router } from "expo-router";
import { MotiView } from "moti";
import { Feather } from "@expo/vector-icons";

export default function Profile() {
  const { user, signOut } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();

  const [username, setUsername] = useState(
    user?.email?.split("@")[0] || "User"
  );

  // Simulated data (since you don't have orders, wishlist, or points tables)
  const [userData, setUserData] = useState({
    orders: 0, // Simulated
    wishlist: 0, // Simulated
    points: 0, // Simulated
  });

  const handleLogout = async () => {
    try {
      await signOut();
      router.replace("/(auth)/Login");
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  const getUsername = (email) => email?.split("@")[0] || "User";

  return (
    <Box flex={1} p={6} bg={useColorModeValue("gray.100", "gray.900")}>
      {/* Header with Settings Button and Theme Toggle */}
      <HStack justifyContent="space-between" alignItems="center" pt={6} px={3}>
        <Text fontSize="2xl" bold color={useColorModeValue("black", "white")}>
          Profile
        </Text>
        <HStack space={2}>
          <IconButton
            icon={
              <Icon
                as={Feather}
                name={colorMode === "light" ? "sun" : "moon"}
                size="lg"
                color={useColorModeValue("black", "white")}
              />
            }
            onPress={toggleColorMode}
          />
        
        </HStack>
      </HStack>

      <Center flex={1}>
        <VStack space={6} alignItems="center">
          {/* Profile Image */}
          <MotiView
            from={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 10, delay: 100 }}
          >
            {user?.user_metadata?.avatar_url ? (
              <Image
                source={{ uri: user.user_metadata.avatar_url }}
                alt="Profile Image"
                size="120px"
                borderRadius="full"
                borderWidth={3}
                borderColor={useColorModeValue("black", "white")}
              />
            ) : (
              <Box
                size="120px"
                borderRadius="full"
                bg={useColorModeValue("gray.300", "gray.600")}
                justifyContent="center"
                alignItems="center"
              >
                <Text
                  fontSize="3xl"
                  color={useColorModeValue("black", "white")}
                >
                  👤
                </Text>
              </Box>
            )}
          </MotiView>

          {/* User Data */}
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", duration: 500, delay: 200 }}
          >
            <VStack space={2} alignItems="center">
              <Text
                fontSize="2xl"
                bold
                color={useColorModeValue("black", "white")}
              >
                @{username}
              </Text>
              <Text
                fontSize="md"
                color={useColorModeValue("gray.700", "gray.400")}
              >
                Welcome back!
              </Text>
            </VStack>
          </MotiView>

          {/* Stats Section */}
          <MotiView
            from={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", delay: 300 }}
          >
            <HStack space={6}>
              <VStack alignItems="center">
                <Text
                  fontSize="xl"
                  bold
                  color={useColorModeValue("black", "white")}
                >
                  {userData.orders}
                </Text>
                <Text
                  fontSize="sm"
                  color={useColorModeValue("gray.700", "gray.400")}
                >
                  Orders
                </Text>
              </VStack>
              <VStack alignItems="center">
                <Text
                  fontSize="xl"
                  bold
                  color={useColorModeValue("black", "white")}
                >
                  {userData.wishlist}
                </Text>
                <Text
                  fontSize="sm"
                  color={useColorModeValue("gray.700", "gray.400")}
                >
                  Wishlist
                </Text>
              </VStack>
              <VStack alignItems="center">
                <Text
                  fontSize="xl"
                  bold
                  color={useColorModeValue("black", "white")}
                >
                  {userData.points}
                </Text>
                <Text
                  fontSize="sm"
                  color={useColorModeValue("gray.700", "gray.400")}
                >
                  Points
                </Text>
              </VStack>
            </HStack>
          </MotiView>

          <MotiView
            from={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", delay: 500 }}
          >
            <Button
              onPress={handleLogout}
              w="64"
              bg="red.500"
              _pressed={{ bg: "red.600" }}
              borderRadius="lg"
              py={3}
              shadow={3}
            >
              Logout
            </Button>
          </MotiView>
        </VStack>
      </Center>

      {/* Edit Profile Modal */}
    </Box>
  );
}
