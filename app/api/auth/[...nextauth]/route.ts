import NextAuth, { AuthOptions } from 'next-auth'

const buildURLQuery = (data: Record<string, string>) =>
  Object.entries(data)
    .map((pair) => pair.map(encodeURIComponent).join('='))
    .join('&')

declare module 'next-auth' {
  interface Session {
    accessToken: string
    user: {
      id: string
      name: string
      // email: string
    }
  }
}

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = String(token.accessToken)
      return session
    },
  },
  providers: [
    {
      id: 'beeminder',
      name: 'Beeminder',
      type: 'oauth',
      authorization: `https://www.beeminder.com/apps/authorize?${buildURLQuery({
        client_id: process.env.BEEMINDER_CLIENT_ID,
        redirect_uri: process.env.NEXTAUTH_CALLBACK_URL,
        response_type: 'token',
      })}`,
      clientId: process.env.BEEMINDER_CLIENT_ID,
      userinfo: {
        request: async (context) => {
          const res = await fetch(
            `https://www.beeminder.com/api/v1/users/me.json?${buildURLQuery({
              access_token: String(context?.tokens?.access_token),
            })}`,
          )
          return res.json()
        },
      },
      async profile(profile) {
        return {
          id: profile.id,
          name: profile.username,
          // email: profile.email,
        }
      },
    },
  ],
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
