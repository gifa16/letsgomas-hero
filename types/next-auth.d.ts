/* eslint-disable @typescript-eslint/no-unused-vars */
// types/next-auth.d.ts
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    user: {
      name?: string;
      email?: string;
      image?: string;
      role?: string;
    };
  }

  interface JWT {
    accessToken?: string;
    user?: {
      role?: string;
    };
  }
}
