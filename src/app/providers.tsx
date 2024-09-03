'use client'

import chakraTheme from '@/themes/chakra-theme'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ChakraProvider theme={chakraTheme}>
        <AntdRegistry>
          {children}
        </AntdRegistry>
      </ChakraProvider>
    </SessionProvider>
  )
}