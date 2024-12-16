/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { loginWithGoogle, signIn } from '@/services/auth/services';
import NextAuth, { NextAuthOptions } from 'next-auth';
import { compare } from 'bcrypt';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import jwt from 'jsonwebtoken';

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const user: any = await signIn(email);
        if (user) {
          const passwordConfirm = await compare(password, user.password);
          if (passwordConfirm) {
            return user;
          }
          return null;
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }: any) {
      if (account?.provider === 'credentials') {
        token.email = user.email;
        token.password = user.password;
        token.role = user.role;
      }

      if (account?.provider === 'google') {
        const data = {
          fullname: user.name,
          email: user.email,
          type: 'google',
        };

        await loginWithGoogle(data, (data: any) => {
          token.email = data.email;
          token.fullname = data.fullname;
          token.role = data.role;
        });
      }

      return token;
    },

    async session({ session, token }: any) {
      if ('email' in token) {
        session.user.email = token.email;
      }
      if ('password' in token) {
        session.user.password = token.password;
      }

      const accessToken = jwt.sign(token, process.env.NEXTAUTH_SECRET || '', {
        algorithm: 'HS256',
      });

      session.accessToken = accessToken;

      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
  },
};

export default NextAuth(authOptions);