import React from "react";
import { Box, Text, Icon, useColorModeValue } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types"; // Import PropTypes
const alertColors = {
  success: { icon: "checkmark-circle", color: "green.500" },
  error: { icon: "close-circle", color: "red.500" },
  info: { icon: "information-circle", color: "blue.500" },
  warning: { icon: "warning", color: "yellow.500" },
};

const CustomAlert = ({ title, description, status }) => {
  const colorMode = useColorModeValue("black", "white");
  const alertColor = alertColors[status] || alertColors.info;

  return (
    <Box
      zIndex={99}
      flexDirection="row"
      alignItems="center" // Align items in the center vertically
      p={2}
      bg={useColorModeValue("white", "gray.800")}
      borderRadius="md"
      shadow={2}
      borderWidth={1}
      borderColor={alertColor.color}
      width="320px" // Set a fixed width for the alert box
      mx="auto" // Center horizontally
    >
      <Icon
        as={Ionicons}
        name={alertColor.icon}
        size="lg"
        color={alertColor.color}
      />
      <Box ml={3} flex={1}>
        <Text fontWeight="bold" color={alertColor.color}>
          {title}
        </Text>
        <Text color={colorMode} flexWrap="wrap" mt={1}>
          {description}
        </Text>
      </Box>
    </Box>
  );
};

// Add PropTypes validation
CustomAlert.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  status: PropTypes.oneOf(["success", "error", "info", "warning"]).isRequired,
};
export default CustomAlert;
