import { createI18nMiddleware } from 'next-international/middleware'
import { NextRequest } from 'next/server'

const I18nMiddleware = createI18nMiddleware({
  locales: ['en', 'uk', 'ru'],
  defaultLocale: 'en',
})

export function middleware(request: NextRequest) {
  return I18nMiddleware(request)
}

export const config = {
  matcher: ['/((?!graphql|api|static|.*\\..*|_next|favicon.ico|robots.txt).*)']
}
