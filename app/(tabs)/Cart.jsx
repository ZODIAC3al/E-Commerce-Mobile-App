import React, { useContext, useState } from "react";
import {
  Box,
  Text,
  FlatList,
  VStack,
  HStack,
  Button,
  IconButton,
  Center,
  useColorModeValue,
  ScrollView,
} from "native-base";
import { CartContext } from "../../Context/CartContext";
import { MotiView } from "moti";
import { MinusCircle, PlusCircle, Trash2 } from "lucide-react-native";
import { useShowToast } from "../../components/showToast";
import { Easing } from "react-native-reanimated";

export default function Cart() {
  const { cart, addToCart, removeFromCart, clearItemFromCart } =
    useContext(CartContext);
  const [isCheckingOut, setIsCheckingOut] = useState(false); // State for checkout loading
  const showToast = useShowToast();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const bgColor = useColorModeValue("gray.100", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("black", "white");
  const priceColor = useColorModeValue("blue.600", "blue.300");
  const buttonBg = useColorModeValue("blue.500", "blue.300");
  const buttonPressedBg = useColorModeValue("blue.600", "blue.400");

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      showToast("Checkout Successful", "Your order has been placed!", "success");
    }, 2000); // Simulate a 2-second checkout process
  };

  return (
    <Box flex={1} bg={bgColor}>
      {cart.length === 0 ? (
        // Empty Cart Message (Centered on the entire screen)
        <Center flex={1}>
          <MotiView
            from={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "timing", duration: 500 }}
          >
            <Text fontSize="xl" color="gray.500" textAlign="center">
              Your cart is empty 😔
            </Text>
          </MotiView>
        </Center>
      ) : (
        // Cart Items and Checkout Section
        <Box flex={1}>
          <ScrollView flex={1}>
            <Box mt="12" p={4}>
              <FlatList
                data={cart}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => (
                  <MotiView
                    from={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{
                      type: "spring",
                      delay: index * 100,
                      damping: 10,
                      stiffness: 100,
                    }}
                  >
                    <Box
                      bg={cardBg}
                      borderRadius="xl"
                      shadow={2}
                      p={4}
                      mb={3}
                      overflow="hidden"
                    >
                      <HStack
                        space={4}
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <VStack flex={1}>
                          <Text fontSize="lg" bold color={textColor}>
                            {item.name}
                          </Text>
                          <Text fontSize="md" color="gray.500">
                            ${item.price} x {item.quantity}
                          </Text>
                          <Text fontSize="lg" color={priceColor} bold mt={1}>
                            ${item.price * item.quantity}
                          </Text>
                        </VStack>

                        {/* Quantity Controls */}
                        <HStack alignItems="center" space={3}>
                          <IconButton
                            icon={
                              <MotiView
                                from={{ scale: 1 }}
                                animate={{ scale: 1 }}
                                transition={{
                                  type: "spring",
                                  damping: 10,
                                  stiffness: 100,
                                }}
                              >
                                <MinusCircle size={24} color="orange" />
                              </MotiView>
                            }
                            onPress={() => {
                              removeFromCart(item.id);
                              showToast(
                                "Removed from Cart",
                                `Reduced quantity of ${item.name}`,
                                "warning"
                              );
                            }}
                          />
                          <Text fontSize="lg" bold color={textColor}>
                            {item.quantity}
                          </Text>
                          <IconButton
                            icon={
                              <MotiView
                                from={{ scale: 1 }}
                                animate={{ scale: 1 }}
                                transition={{
                                  type: "spring",
                                  damping: 10,
                                  stiffness: 100,
                                }}
                              >
                                <PlusCircle size={24} color="green" />
                              </MotiView>
                            }
                            onPress={() => {
                              addToCart(item);
                              showToast(
                                "Added to Cart",
                                `Increased quantity of ${item.name}`,
                                "success"
                              );
                            }}
                          />
                          <IconButton
                            icon={
                              <MotiView
                                from={{ scale: 1 }}
                                animate={{ scale: 1 }}
                                transition={{
                                  type: "spring",
                                  damping: 10,
                                  stiffness: 100,
                                }}
                              >
                                <Trash2 size={24} color="red" />
                              </MotiView>
                            }
                            onPress={() => {
                              clearItemFromCart(item.id);
                              showToast(
                                "Item Removed",
                                `${item.name} removed from cart`,
                                "error"
                              );
                            }}
                          />
                        </HStack>
                      </HStack>
                    </Box>
                  </MotiView>
                )}
              />
            </Box>
          </ScrollView>

          {/* Total & Checkout (Fixed at the bottom) */}
          <Box
            position="absolute" // Fix the checkout section at the bottom
            bottom={0} // Position at the bottom of the screen
            left={0}
            right={0}
            bg={cardBg}
            borderRadius="lg"
            shadow={2}
            p={4}
          >
            <Text fontSize="xl" bold color={textColor}>
              Total: ${total.toFixed(2)}
            </Text>
            <MotiView
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: "timing", duration: 500 }}
            >
              <Button
                mt={4}
                bg={buttonBg}
                _pressed={{ bg: buttonPressedBg }}
                borderRadius="md"
                py={3}
                onPress={handleCheckout}
                isLoading={isCheckingOut}
                _loading={{
                  bg: "blue.600",
                  _text: { color: "white" },
                }}
                _spinner={{ color: "white" }}
              >
                {isCheckingOut ? "Processing..." : "Checkout"}
              </Button>
            </MotiView>
          </Box>
        </Box>
      )}
    </Box>
  );
}