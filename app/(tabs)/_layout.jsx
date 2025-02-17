import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { IconButton, useColorMode, MoonIcon, SunIcon, Box, Text, useColorModeValue } from "native-base";
import { MotiView } from "moti";

export default function TabsLayout() {
  const { colorMode, toggleColorMode } = useColorMode();

  const tabBarBg = useColorModeValue("#ffffff", "#121212");
  const tabBarActiveTintColor = useColorModeValue("#000", "#fff");
  const tabBarInactiveTintColor = useColorModeValue("#888", "#666");

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: tabBarBg,
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          height: 60,
          paddingBottom: 5,
          
        },
        tabBarActiveTintColor: tabBarActiveTintColor,
        tabBarInactiveTintColor: tabBarInactiveTintColor,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
        },
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MotiView
              from={{ scale: 1 }}
              animate={{ scale: focused ? 1.2 : 1 }}
              transition={{ type: "spring", damping: 10, stiffness: 100 }}
            >
              <Ionicons name="home-outline" color={color} size={size} />
            </MotiView>
          ),
          tabBarLabel: ({ color, focused }) => (
            <Text color={color} fontSize="xs" fontWeight={focused ? "bold" : "normal"}>
              Home
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="Cart"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MotiView
              from={{ scale: 1 }}
              animate={{ scale: focused ? 1.2 : 1 }}
              transition={{ type: "spring", damping: 10, stiffness: 100 }}
            >
              <Ionicons name="cart-outline" color={color} size={size} />
            </MotiView>
          ),
          tabBarLabel: ({ color, focused }) => (
            <Text color={color} fontSize="xs" fontWeight={focused ? "bold" : "normal"}>
              Cart
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MotiView
              from={{ scale: 1 }}
              animate={{ scale: focused ? 1.2 : 1 }}
              transition={{ type: "spring", damping: 10, stiffness: 100 }}
            >
              <Ionicons name="person-outline" color={color} size={size} />
            </MotiView>
          ),
          tabBarLabel: ({ color, focused }) => (
            <Text color={color} fontSize="xs" fontWeight={focused ? "bold" : "normal"}>
              Profile
            </Text>
          ),
          headerRight: () => (
            <IconButton
              icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              onPress={toggleColorMode}
              variant="ghost"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Search"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MotiView
              from={{ scale: 1 }}
              animate={{ scale: focused ? 1.2 : 1 }}
              transition={{ type: "spring", damping: 10, stiffness: 100 }}
            >
              <Ionicons name="search-outline" color={color} size={size} />
            </MotiView>
          ),
          tabBarLabel: ({ color, focused }) => (
            <Text color={color} fontSize="xs" fontWeight={focused ? "bold" : "normal"}>
              Search
            </Text>
          ),
        }}
      />
    </Tabs>
  );
}