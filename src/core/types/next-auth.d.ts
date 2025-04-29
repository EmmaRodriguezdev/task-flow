/* eslint-disable @typescript-eslint/no-empty-object-type */
// src/types/next-auth.d.ts

import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT as DefaultJWT } from 'next-auth/jwt';

/** Role Interface */
export interface Role {}

/** Permissions Interface  */
export interface Permission {
  id: number;
  module: string;
  modleEs: string;
  name: string;
  code: string;
}

/** UserRole Interface */
export interface UserRole {
  id: number;
  name: string;
  permissions: Permission[];
}

/** Interface representing the user data returned from your API */
export interface APIUser {}

/** IUser Interface for NextAuth */
export interface IUser extends DefaultUser {
  id: string;
  name: string;
  email: string;
  odooPartnerId: number;
  roles: UserRole[];
}

/** Module Augmentation for NextAuth */
declare module 'next-auth' {
  interface User extends IUser {}

  interface Session extends DefaultSession {
    user?: User;
    token?: string;
    createdAt: string;
    updatedAt: string;
  }
}

/** Module Augmentation for NextAuth JWT */
declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT, IUser {}
}