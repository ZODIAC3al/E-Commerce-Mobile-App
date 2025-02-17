import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  FlatList,
  Image,
  VStack,
  HStack,
  Text,
  Spinner,
  Center,
  Button,
  Pressable,
  ScrollView,
  Input,
  Icon,
  Badge,
  useColorModeValue,
} from "native-base";
import { supabase } from "../../lib/supabase";
import { CartContext } from "../../Context/CartContext";
import { MotiView } from "moti";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../Context/AuthContext";
import { useShowToast } from "../../components/showToast";
import Header from "../../components/Header";
import { StatusBar } from "expo-status-bar";

export default function Home({ navigation }) {
  const [products, setProducts] = useState([]);
  const [deals, setDeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { cart, addToCart } = useContext(CartContext);
  const { user } = useAuth();
  const showToast = useShowToast();

  const bgColor = useColorModeValue("gray.100", "gray.900");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const cardBg = useColorModeValue("white", "gray.800");
  const inputBg = useColorModeValue("gray.200", "gray.700");
  const placeholderColor = useColorModeValue("gray.500", "gray.400");
  const buttonBg = useColorModeValue("blue.500", "blue.300");
  const buttonPressedBg = useColorModeValue("blue.600", "blue.400");
  const iconColor = useColorModeValue("gray.600", "gray.300");

  useEffect(() => {
    fetchProducts();
    fetchDeals();
    fetchCategories();
  }, []);

  const getUsername = (email) => email?.split("@")[0] || "User";

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase.from("products").select("*");
      if (!error) setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDeals = async () => {
    try {
      const { data, error } = await supabase.from("deals").select(`
          id,
          discount_percentage,
          start_date,
          end_date,
          product:products(id, name, image, price, category_id)
        `);

      if (error) throw error;

      if (!data || data.length === 0) {
        console.log("❌ No deals available");
        setDeals([]);
        return;
      }

      const formattedDeals = data
        .filter((deal) => deal.product) // Ensure product exists
        .map((deal) => ({
          id: deal.id,
          name: deal.product.name,
          image: deal.product.image,
          originalPrice: deal.product.price,
          discountedPrice: deal.product.price
            ? (
                deal.product.price *
                (1 - deal.discount_percentage / 100)
              ).toFixed(2)
            : 0,
        }));

      console.log("✅ Fetched Deals with Products:", formattedDeals);
      setDeals(formattedDeals);
    } catch (err) {
      console.error("🚨 Error fetching deals:", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase.from("categories").select("*");

      if (error) throw error;

      if (!data || data.length === 0) {
        console.log("❌ No categories available");
        setCategories([]);
        return;
      }

      console.log("✅ Fetched Categories:", data);
      setCategories(data);
    } catch (err) {
      console.error("🚨 Error fetching categories:", err);
    }
  };

  const filteredProducts = selectedCategory
    ? products.filter((item) => item.category_id === selectedCategory.id)
    : products.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

  if (loading) {
    return (
      <Center flex={1} bg={bgColor}>
        <Spinner size="lg" color={buttonBg} />
      </Center>
    );
  }

  return (
    <ScrollView flex={1} bg={bgColor}>
   
      <Box p={4} mt="12">
        {/* Header */}
    <Header navigation={navigation} cart={cart} user={user}/>

        {/* Search Bar */}
        <Input
          placeholder="Search products..."
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
          bg={inputBg}
          borderRadius="full"
          px={4}
          py={3}
          mb={4}
          color={textColor}
          fontSize="md"
          placeholderTextColor={placeholderColor}
          InputLeftElement={
            <Icon as={Ionicons} name="search" size={5} ml={3} color={iconColor} />
          }
        />

  {/* Deals Section */}
<Box mb={6}>
<Text fontSize="xl" bold color={textColor} mb={4}>
  Deals
</Text>
{deals.length > 0 ? (
  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    <HStack space={4}>
      {deals.map((deal, index) => (
        <MotiView
          key={deal.id}
          from={{ opacity: 0, translateX: -20 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ type: "timing", duration: 500, delay: index * 100 }}
        >
          <Pressable>
            <Box
              bg={cardBg}
              borderRadius="2xl"
              shadow={1}
              p={4}
              mr={3}
              w={160} // Fixed width for all deal items
              h={280} // Fixed height for all deal items
              justifyContent="space-between" // Ensures content is spaced evenly
            >
              <Image
                source={{ uri: deal.image }}
                alt={deal.name}
                h={120} // Fixed height for all images
                w="100%" // Full width of the Box
                resizeMode="contain"
                borderRadius="md"
              />
              <Text bold mt={2} color={textColor} textAlign="center">
                {deal.name}
              </Text>
              <Text
                color="red.500"
                bold
                textAlign="center"
                fontSize="lg"
              >
                ${deal.discountedPrice}{" "}
                <Text strikeThrough>${deal.originalPrice}</Text>
              </Text>
            </Box>
          </Pressable>
        </MotiView>
      ))}
    </HStack>
  </ScrollView>
) : (
  <Text color="gray.500" textAlign="center">
    No deals available
  </Text>
)}
</Box>

        {/* Categories Section */}
        <Box mb={6}>
          <Text fontSize="xl" bold color={textColor} mb={4}>
            Categories
          </Text>
          {categories.length > 0 ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <HStack space={4}>
                {categories.map((category, index) => (
                  <MotiView
                    key={category.id}
                    from={{ opacity: 0, translateX: -20 }}
                    animate={{ opacity: 1, translateX: 0 }}
                    transition={{ type: "timing", duration: 500, delay: index * 100 }}
                  >
                    <Pressable onPress={() => setSelectedCategory(category)}>
                      <Box
                        bg={cardBg}
                        borderRadius="2xl"
                        shadow={3}
                        p={4}
                        mr={3}
                        w={120}
                      >
                        <Text bold color={textColor} textAlign="center">
                          {category.name}
                        </Text>
                      </Box>
                    </Pressable>
                  </MotiView>
                ))}
              </HStack>
            </ScrollView>
          ) : (
            <Text color="gray.500" textAlign="center">
              No categories available
            </Text>
          )}
        </Box>

        {/* Products Section */}
        <Box>
          <Text fontSize="xl" bold color={textColor} mb={4}>
            Products
          </Text>
          <FlatList
            data={filteredProducts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
              <MotiView
                from={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: "spring", delay: index * 100, damping: 10, stiffness: 100 }}
              >
                <Pressable>
                  <Box bg={cardBg} borderRadius="xl" shadow={4} p={4} mb={4}>
                    <HStack space={4} alignItems="center">
                      <Image
                        source={{ uri: item.image }}
                        alt={item.name}
                        size="xl"
                        borderRadius="lg"
                      />
                      <VStack flex={1}>
                        <Text bold color={textColor} fontSize="lg">
                          {item.name}
                        </Text>
                        <Text color={iconColor} fontSize="sm">
                          {item.description}
                        </Text>
                        <Text bold color="blue.600" fontSize="lg">
                          ${item.price}
                        </Text>
                        <Button
                          mt={2}
                          onPress={() => {
                            addToCart(item);
                            showToast(
                              "Added to Cart",
                              `${item.name} has been added to your cart!`,
                              "success"
                            );
                          }}
                          bg={buttonBg}
                          _pressed={{ bg: buttonPressedBg }}
                          borderRadius="full"
                        >
                          Add to Cart
                        </Button>
                      </VStack>
                    </HStack>
                  </Box>
                </Pressable>
              </MotiView>
            )}
          />
        </Box>
      </Box>
    </ScrollView>
  );
}