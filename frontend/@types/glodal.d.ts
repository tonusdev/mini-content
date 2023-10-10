import { WebApp } from "@tma.js/sdk-react";

export {}

declare global {

  interface Window {
    Telegram: {
      WebApp: WebApp
    };
  }

  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production'

      NEXT_PUBLIC_GRAPHQL_ENDPOINT: string
      NEXT_PUBLIC_MINI_APP_LINK: string
      GRAPHQL_SERVER_ENDPOINT: string
    }
  }
}
