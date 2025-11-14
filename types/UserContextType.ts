import { ReactNode } from "react";

export interface UserProviderProps {
  children: ReactNode;
}
export type UserContextType = {
  user: UserType | null;
  appleLogin: (providerId: string) => Promise<void>;
  appleRegister: (
    email: string,
    name: string,
    provider_id: string
  ) => Promise<void>;
  logout: () => Promise<void>;
};


export type UserType = {
  id: string;
  name: string;
  email: string;
  country?: string;
  points?: number;
  role?: string;
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
    country?: string;
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

export type InsertUserVars = {
  email: string;
  name: string;
  provider: string;
};