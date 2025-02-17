import React from "react";
import {
  Box,
  Text,
  HStack,
  Pressable,
  Icon,
  Badge,
  useColorModeValue,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";
import { router } from "expo-router";

export default function Header({ navigation, cart, user }) {
  const textColor = useColorModeValue("gray.800", "gray.100");
  const iconColor = useColorModeValue("gray.600", "gray.300");
  const badgeColor = useColorModeValue("red.500", "red.300");

  const getUsername = (email) => email?.split("@")[0] || "User";

  return (
    <HStack
      justifyContent="space-between"
      alignItems="center"
      mb={4}
      px={4}
      py={3}
      bg={useColorModeValue("white", "gray.800")}
      borderRadius="lg"
      shadow={2}
    >
      {/* Welcome Text */}
      <MotiView
        from={{ opacity: 0, translateX: -10 }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{ type: "timing", duration: 500 }}
      >
        <Text fontSize="xl" bold color={textColor}>
          Welcome {getUsername(user?.email)} 
        </Text>
      </MotiView>

      {/* Cart Icon with Badge */}
      <Pressable onPress={() => router.push("Cart")}>
        {({ isPressed }) => (
          <MotiView
            from={{ scale: 1 }}
            animate={{ scale: isPressed ? 0.9 : 1 }}
            transition={{ type: "spring", damping: 10, stiffness: 100 }}
          >
            <Box position="relative">
              <Icon
                as={Ionicons}
                name="cart-outline"
                size={8}
                color={iconColor}
              />
              {cart.length > 0 && (
                <MotiView
                  from={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 10, stiffness: 100 }}
                >
                  <Badge
                    colorScheme="red"
                    rounded="full"
                    px={2}
                    position="absolute"
                    right={-1}
                    top={-1}
                    bg={badgeColor}
                  >
                    {cart.length}
                  </Badge>
                </MotiView>
              )}
            </Box>
          </MotiView>
        )}
      </Pressable>
    </HStack>
  );
}