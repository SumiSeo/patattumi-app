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
};

export type UserContextType = {
  user: UserType | null;
  userExists: (providerId: string) => Promise<boolean>;
  appleSignIn: (providerId: string) => Promise<void>;
  appleRegister: (
    email: string,
    name: string,
    provider_id: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  authChecked: boolean;
  appleDeleteUser: (id: string) => Promise<void>;
};

export type AppleUserData = {
  apple_users_by_pk: {
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

export type InsertUserVars = {
  email: string;
  name: string;
  provider: string;
};