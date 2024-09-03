import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";

const resolvedTailwindConfig = resolveConfig(tailwindConfig);
const chakraConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const chakraTheme = extendTheme(
  {
    chakraConfig,
    colors: {
      primary: (resolvedTailwindConfig.theme?.colors as any)?.primary,
      flatprimary: (resolvedTailwindConfig.theme?.colors as any)
        ?.flatprimary,
      'teal': {
        50: "#f0fdfa",
        100: '#ccfbf1',
        200: '#99f6e4',
        300: '#5eead4',
        400: '#2dd4bf',
        500: '#14b8a6',
        600: '#0d9488',
        700: '#0f766e',
        800: '#115e59',
        900: '#134e4a',
      },
    },
  },
  withDefaultColorScheme({
    colorScheme: "primary",
    components: ["Button"],
  }),
  withDefaultColorScheme({
    colorScheme: "flatprimary",
    components: ["Checkbox"],
  })
);

export default chakraTheme;
