/* eslint-disable no-param-reassign */
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { dbUsers } from '../../../database';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'email',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'john@doe.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        return dbUsers.checkUserEmailPassword(credentials!.email, credentials!.password);
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  // Custom pages
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register',
  },
  // Callbacks
  session: {
    maxAge: 2592000, // 30 days
    strategy: 'jwt',
    updateAge: 86400, // daily
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }
      if (account) {
        switch (account.type) {
          case 'oauth': {
            const dbUser = await dbUsers.checkOAuthToUser(user?.email || '', user?.name || '');
            token.user = dbUser;
            token.role = dbUser.role;
            break;
          }
          case 'credentials':
            if (user?.role) {
              token.user = user;
              token.role = user.role;
            }
            break;
          default:
            break;
        }
      }
      return token;
    },
    async session({ session: userSession, token }) {
      const session: any = userSession;
      if (token?.accesToken) {
        session.accessToken = token.accessToken;
      }
      if (token?.role) {
        session.user = token.user as any;
        if (session.user) {
          session.user.role = token.role;
        }
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
