/* eslint-disable @typescript-eslint/no-empty-object-type */
// src/types/next-auth.d.ts

import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT as DefaultJWT } from 'next-auth/jwt';

/** IProfile from user */
export interface IProfileUser {
  id: number;
  userId: number;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

/** IUser Interface for NextAuth */
export interface IUser extends DefaultUser {
  id: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  profile: IProfileUser;
}

/** Module Augmentation for NextAuth */
declare module 'next-auth' {
  interface User extends IUser {}

  interface Session extends DefaultSession {
    user?: User;
    access_token?: string;
  }
}

/** Module Augmentation for NextAuth JWT */
declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT, IUser {}
}