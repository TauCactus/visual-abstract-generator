import { Montserrat } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { motion } from "framer-motion";

const roboto = Montserrat({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const grey: ReturnType<typeof createTheme>["palette"]["grey"] = {
  "50": "#fafafa",
  "100": "#f5f5f5",
  "200": "#eeeeee",
  "300": "#e0e0e0",
  "400": "#bdbdbd",
  "500": "#9e9e9e",
  "600": "#757575",
  "700": "#616161",
  "800": "#424242",
  "900": "#212121",
  A100: "#f5f5f5",
  A200: "#eeeeee",
  A400: "#bdbdbd",
  A700: "#616161",
};

export const theme = createTheme({
  palette: {
    mode: "light",
    grey,
    primary: {
      main: "#dd1d6f",
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      defaultProps: {
        component: motion.button,
        whileHover: { scale: 1.1 },
        whileTap: { scale: 0.9 },
        animate: { scale: 1 },
      } as any,
      styleOverrides: {
        root: {
          textTransform: "initial",
          fontWeight: 600,
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 24,
          paddingRight: 24,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          overflowX: "hidden",
          background: grey[100],
        },
        body: {
          overflowX: "hidden",
          background: grey[100],
          paddingBottom: 40,
        },
      },
    },
  },
});
