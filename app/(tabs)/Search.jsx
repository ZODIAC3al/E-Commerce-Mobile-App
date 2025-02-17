import React, { useState, useEffect } from "react";
import {
  Box,
  Input,
  FlatList,
  VStack,
  HStack,
  Text,
  Image,
  Spinner,
  Center,
  useColorModeValue,
  ScrollView,
} from "native-base";
import { supabase } from "../../lib/supabase";
import { MotiView } from "moti";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const bgColor = useColorModeValue("gray.100", "gray.900");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const cardBg = useColorModeValue("white", "gray.800");
  const inputBg = useColorModeValue("gray.200", "gray.700");
  const placeholderColor = useColorModeValue("gray.500", "gray.400");
  const spinnerColor = useColorModeValue("blue.500", "blue.300");
  const borderColor = useColorModeValue("gray.300", "gray.600");

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    setLoading(true);
    setError("");

    const delayDebounceFn = setTimeout(async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .ilike("name", `%${query}%`);

        if (error) {
          setError("Failed to fetch results. Please try again.");
          console.error("Error searching products:", error);
        } else {
          setResults(data);
        }
      } catch (err) {
        setError("An unexpected error occurred. Please try again.");
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
       <ScrollView flex={1} bg={bgColor}>
    <Box mt="12" p={4} >
      <Input
        placeholder="Search products..."
        value={query}
        onChangeText={setQuery}
        variant="filled"
        bg={inputBg}
        borderRadius="md"
        py={3}
        px={4}
        mb={4}
        color={textColor}
        placeholderTextColor={placeholderColor}
      />

      {loading && (
        <Center>
          <Spinner size="lg" color={spinnerColor} />
        </Center>
      )}

      {error && (
        <Text color="red.500" textAlign="center" mb={4}>
          {error}
        </Text>
      )}

      {!loading && results.length === 0 && query.trim() !== "" && (
        <Text textAlign="center" color={textColor}>
          No results found.
        </Text>
      )}

      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", duration: 500 }}
          >
            <Box
              borderWidth={1}
              borderColor={borderColor}
              borderRadius="md"
              p={4}
              mb={4}
              bg={cardBg}
            >
              <HStack space={4} alignItems="center">
                <Image
                  source={{ uri: item.image }}
                  alt={item.name}
                  size="lg"
                  borderRadius="md"
                />
                <VStack flex={1}>
                  <Text fontSize="lg" bold color={textColor}>
                    {item.name}
                  </Text>
                  <Text fontSize="md" color={textColor}>
                    ${item.price}
                  </Text>
                </VStack>
              </HStack>
            </Box>
          </MotiView>
        )}
      />
    </Box>
    </ScrollView>
  );
}
