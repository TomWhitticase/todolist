import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createMuiTheme, ThemeProvider } from "@mui/material";
const theme = createMuiTheme({
  palette: {
    primary: {
      light: "hsl(250,70%, 65%)!important",
      main: "hsl(250, 70%, 60%)!important",
      dark: "hsl(250, 70%,50%)!important",
      contrastText: "hsl(0, 100%, 100%)!important",
    },
  },
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
