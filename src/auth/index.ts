import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { IUser } from '../core/types/next-auth';
import { Error as CustomError } from '../core/types/utils';
import { ErrorCodes } from '../core/types/enums';

interface LoginData {
  user: IUser;
  token: string;
  createdAt: string;
  updatedAt: string;
}

class CustomSignInError extends Error {
  code: ErrorCodes;

  constructor(code: ErrorCodes) {
    super(code);
    this.code = code;
    this.name = 'CustomSignInError';
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'you@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new CustomSignInError(ErrorCodes.INVALID_CREDENTIALS);
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        if (!res.ok) {
          const errorData = (await res.json()) as CustomError;
          if (errorData.errorCodeName) {
            throw new CustomSignInError(errorData.errorCodeName);
          }
          throw new CustomSignInError(ErrorCodes.UNKNOWN_ERROR);
        }
        const data = (await res.json()) as LoginData;
        return { ...data.user, token: data.token };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 días
    updateAge: 24 * 60 * 60, // 24 horas
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        return { ...token, ...user };
      }
      if (trigger === 'update' && session) {
        return { ...token, ...session.user };
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.token = token.token as string;
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.odooPartnerId = token.odooPartnerId;
        session.user.roles = token.roles;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/login',
  },
};