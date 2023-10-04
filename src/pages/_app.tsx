import type { AppProps } from "next/app";
import { ThemeRegistry } from "@/configuration/theme-registry";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeRegistry>
        <Component {...pageProps} />
      </ThemeRegistry>
    </QueryClientProvider>
  );
}
