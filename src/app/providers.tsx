"use client";

import chakraTheme from "@/themes/chakra-theme";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ChakraProvider theme={chakraTheme}>
        <AntdRegistry>
          <Toaster />
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </AntdRegistry>
      </ChakraProvider>
    </SessionProvider>
  );
}
