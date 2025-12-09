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
  token: string;
};


export type UserContextType = {
  user: UserType | null;
  userExists: (providerId: string) => Promise<string | null>;
  googleUserExists: (providerId: string) => Promise<string | null>;
  appleRegister: (
    email: string,
    name: string,
    provider_id: string
  ) => Promise<void>;
  googleRegister: (
    email: string,
    name: string,
    provider_id: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  authChecked: boolean;
  appleDeleteUser: (id: string) => Promise<void>;
  googleDeleteUser: (id: string) => Promise<void>;
  signIn: (
    userId: string,
    provider: string,
    providerId: string
  ) => Promise<void>;
};
