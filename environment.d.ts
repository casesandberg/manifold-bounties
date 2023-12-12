declare namespace NodeJS {
  interface ProcessEnv {
    NEXTAUTH_SECRET: string
    NEXTAUTH_CALLBACK_URL: string
    BEEMINDER_CLIENT_ID: string
    BEEMINDER_CLIENT_SECRET: string
  }
}
