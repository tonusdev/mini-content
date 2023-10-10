'use client'

import { PropsWithChildren} from 'react'
import { useSDK } from '@tma.js/sdk-react'

/**
 * This component is the layer controlling the application display. It displays
 * application in case, the SDK is initialized, displays an error if something
 * went wrong, and a loader if the SDK is warming up.
 */
export function SDKLoader({ children }: PropsWithChildren<{}>) {
  const { didInit, components, error } = useSDK()

  if (!didInit || components === null) {
    return <></>
  }

  if (error !== null) {
    return <div>Something went wrong.</div>
  }

  return <>{children}</>
}
