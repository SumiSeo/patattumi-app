import { ADD_APPLE_USER_ONE, ADD_USER_ONE } from "@/mutations/AddUser";
import { useMutation } from "@apollo/client/react";
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
  appleRegister: (
    email: string,
    name: string,
    provider_id: string
  ) => Promise<void>;
  logout: () => Promise<void>;
};
type InsertUserData = {
  insert_users_one: {
    id: string;
    name: string;
    email: string;
    provider: string;
  } | null;
};

type InsertUserVars = {
  email: string;
  name: string;
  provider: string;
};

export const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: UserProviderProps) {
  const [InsertUser] = useMutation<InsertUserData, InsertUserVars>(
    ADD_USER_ONE
  );
  const [InsertAppleUser] = useMutation(ADD_APPLE_USER_ONE);

  const [user, setUser] = useState<UserType | null>(null);

  async function appleLogin(userId: string) {}
  async function appleRegister(
    email: string,
    name: string,
    provider_id: string
  ) {
    try {
      const result = await InsertUser({
        variables: {
          email,
          name,
          provider: "apple",
        },
      });
      if (result) {
        const id = result.data?.insert_users_one?.id;
        await InsertAppleUser({
          variables: {
            provider_id,
            user_id: id,
          },
        });
      }
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
      }
    }
  }

  async function logout() {}
  return (
    <UserContext.Provider value={{ user, appleLogin, logout, appleRegister }}>
      {children}
    </UserContext.Provider>
  );
}
