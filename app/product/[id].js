import React, { useEffect, useState } from "react";
import { Box, Image, Text, VStack, Button, Spinner, Center, useColorModeValue } from "native-base";
import { useLocalSearchParams } from "expo-router";
import { supabase } from "../../lib/supabase";

export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    const { data, error } = await supabase.from("products").select("*").eq("id", id).single();
    if (error) console.error("Error fetching product:", error);
    else setProduct(data);
    setLoading(false);
  };

  if (loading) {
    return (
      <Center flex={1} bg={useColorModeValue("lightBg", "darkBg")}>
        <Spinner size="lg" />
      </Center>
    );
  }

  return (
    <Box flex={1} p={4} bg={useColorModeValue("lightBg", "darkBg")}>
      <Image source={{ uri: product.image }} alt={product.name} size="2xl" />
      <VStack space={2} mt={4}>
        <Text fontSize="2xl" bold color={useColorModeValue("lightText", "darkText")}>
          {product.name}
        </Text>
        <Text fontSize="lg" color={useColorModeValue("gray.800", "gray.400")}>
          ${product.price}
        </Text>
        <Text color={useColorModeValue("gray.700", "gray.300")}>{product.description}</Text>
        <Button mt={4}>Add to Cart</Button>
      </VStack>
    </Box>
  );
}
