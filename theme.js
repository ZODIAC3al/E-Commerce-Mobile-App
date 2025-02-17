import { extendTheme } from "native-base";

const config = {
  useSystemColorMode: false, // Prevents automatic mode switching
  initialColorMode: "light",
};

const colors = {
  primary: {
    500: "#3B82F6",
    900: "#1E40AF",
  },
  darkBg: "#121212",
  lightBg: "#FFFFFF",
  darkText: "#FFFFFF",
  lightText: "#000000",
};

export const theme = extendTheme({ config, colors });
