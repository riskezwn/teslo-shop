/* eslint-disable no-param-reassign */
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'email',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'john@doe.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize() {
        const user = { id: 1, name: 'J Smith', email: 'jsmith@example.com' };

        if (user) {
          return user;
        }
        return null;
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, account, user }: any) {
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }
      if (account) {
        switch (account.type) {
          case 'oauth': {
            token.user = user;
            break;
          }
          case 'credentials':
            token.user = user;
            break;
          default:
            break;
        }
      }
      return token;
    },
    async session({ session: userSession, token }: any) {
      const session: any = userSession;
      if (token?.accesToken) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
