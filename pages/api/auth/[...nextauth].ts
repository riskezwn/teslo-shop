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
  // Callbacks
  callbacks: {
    async jwt({ token, account, user }) {
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }
      if (account) {
        switch (account.type) {
          case 'oauth':
            // TODO: crear usuario o verificar si existe en DB
            break;
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
