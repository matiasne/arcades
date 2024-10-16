import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const theme = extendTheme({
  initialColorMode: "dark",
  useSystemColorMode: false,
  styles: {
    global: (props) => ({
      body: {
        bg: mode("#19182A", "#19182A")(props),
        lineHeight: "base",
        fontFamily: "Inter",
      },
      "*::placeholder": {
        color: mode("gray.300", "whiteAlpha.300")(props),
      },
      "*, *::before, &::after": {
        borderColor: mode("gray.600", "whiteAlpha.600")(props),
        wordWrap: "break-word",
      },
      ".chakra-modal__close-btn": {
        color: "white",
        opacity: "0.3",
      },
      ".chakra-button::hover": {
        backgroundColor: "transparent",
      },
      ".chakra-input": {
        color: "white",
      },
      Text: {
        fontFamily: "Inter",
        color: "white",
      },
      h1: {
        color: "white",
        fontSize: "20px",
        fontFamily: "Futura Std",
      },
      h2: {
        color: "white",
        fontSize: "15px",
        fontFamily: "Futura Std",
      },
      h3: {
        color: "#23BC5C",
        fontSize: "15px",
        fontFamily: "Futura Std",
      },
      h4: {
        color: "white",
        fontSize: "15px",
        fontFamily: "Source Sans Pro",
      },
      h5: {
        color: "white",
        fontSize: "8px",
        fontFamily: "Source Sans Pro",
      },

      p: {
        color: "white",
        fontFamily: "Futura Std",
      },
    }),
  },

  semanticTokens: {
    colors: {
      error: "red.500",
      success: "green.500",
      fgPrimary: "#23BC5C",

      fgSecondary: "#F2F2F2",
      bgPrimary: "#272F41",
      bgSecondary: "#19182A",
    },
  },
});

export default theme;
