import { createContext, ReactNode, useState } from "react";
interface UserProviderProps {
  children: ReactNode;
}
type UserType = {
  name: string;
  email: string;
};
type UserContextType = {
  user: UserType | null;
  appleLogin: (userId: string) => Promise<void>;
  appleRegister: (email: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<UserType | null>(null);

  async function appleLogin(userId: string) {}
  async function appleRegister(email: string, name: string) {}

  async function logout() {}
  return (
    <UserContext.Provider value={{ user, appleLogin, logout, appleRegister }}>
      {children}
    </UserContext.Provider>
  );
}
