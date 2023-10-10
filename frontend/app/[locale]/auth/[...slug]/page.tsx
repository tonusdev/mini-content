'use client'

import { useAuthenticateMutation } from '@/services/useAuthenticateMutation'
import { useWebApp, useLaunchParams, useViewport } from '@tma.js/sdk-react'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AuthPage() {
  const webApp = useWebApp()
  const viewport = useViewport()
  const pathname = usePathname()
  const router = useRouter()
  const launchParams = useLaunchParams()
  const { mutate: authenticate, data, isSuccess } = useAuthenticateMutation()

  useEffect(() => {
    const { initDataRaw } = launchParams
    if (initDataRaw) {
      console.log(
        'Enter this into authenticate mutation in Apollo IDE for development: '
      )
      authenticate({ input: { initDataRaw } })
    }
  }, [launchParams, authenticate])

  useEffect(() => {
    if (isSuccess && data.authenticate === true && webApp) {
      const routeTo = pathname.substring(pathname.indexOf('/auth') + 5)
      const { initData } = launchParams
      let locale = initData?.user?.languageCode ?? ''
      if (!['en', 'uk', 'ru'].includes(locale)) {
        locale = 'en'
      }
      router.replace(locale + '/' + routeTo + '/' + (initData?.startParam ? initData.startParam : ''))
      webApp.ready()
      viewport.expand()
      window.Telegram = {
        WebApp: webApp,
      }
    }
  }, [isSuccess, data, webApp])

  return <div className="flex min-h-screen"></div>
}
