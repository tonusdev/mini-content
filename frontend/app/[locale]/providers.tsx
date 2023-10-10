'use client'

import * as React from 'react'
import { SDKProvider, SDKInitOptions } from '@tma.js/sdk-react'
import { NextUIProvider } from '@nextui-org/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { SDKLoader } from '@/components/SDKLoader'
import { I18nProviderClient } from '@/i18n/client'


export interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  const sdkInitOptions: SDKInitOptions = {
    acceptScrollbarStyle: true,
    checkCompat: true,
    cssVars: true,
  }

  const queryClient = new QueryClient()

  return (
    <>
      <SDKProvider initOptions={sdkInitOptions}>
        <I18nProviderClient>
          <NextUIProvider>
            <QueryClientProvider client={queryClient}>
              <SDKLoader>{children}</SDKLoader>
            </QueryClientProvider>
          </NextUIProvider>
        </I18nProviderClient>
      </SDKProvider>
    </>
  )
}
