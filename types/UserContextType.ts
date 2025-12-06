import { ReactNode } from "react";

export interface UserProviderProps {
  children: ReactNode;
}
export type UserType = {
  id: string;
  name: string;
  email: string;
  language?: string;
  korean_name?: string;
  age?: string;
  totem?: string;
  points?: number;
  role?: string;
  provider?: string;
};

export type UserContextType = {
  user: UserType | null;
  userExists: (providerId: string) => Promise<boolean>;
  googleUserExists: (providerId: string) => Promise<string | null>;
  appleSignIn: (roviderId: string) => Promise<void>;
  appleRegister: (
    email: string,
    name: string,
    provider_id: string
  ) => Promise<void>;
  googleRegister: (
    user_id: string,
    email: string,
    name: string,
    provider_id: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  authChecked: boolean;
  appleDeleteUser: (id: string) => Promise<void>;
  googleDeleteUser: (id: string) => Promise<void>;
  googleSignIn: (userId: string, providerId: string) => Promise<void>;
};

export type AppleUserData = {
  apple_users_by_pk: {
    user_id: string;
  } | null;
};

export type GoogleUserData = {
  google_users_by_pk: {
    user_id: string;
  } | null;
};
export type UserData = {
  users_by_pk: {
    id: string;
    name: string;
    email: string;
    language?: string;
    korean_name?: string;
    age?: string;
    totem?: string;
    points?: number;
    role?: string;
    provider?: string;
  } | null;
};

export type InsertUserData = {
  insert_users_one: {
    id: string;
    name: string;
    email: string;
    provider: string;
  } | null;
};

export type InsertAppleUserData = {
  insert_apple_users_one: {
    provider_id: string;
  } | null;
};

export type InsertGoogleUserData = {
  insert_google_users_one: {
    provider_id: string;
  } | null;
};

export type InsertUserVars = {
  email: string;
  name: string;
  provider: string;
};