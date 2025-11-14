import { ADD_APPLE_USER_ONE, ADD_USER_ONE } from "@/mutations/AddUser";
import { QUERY_APPLE_USER, QUERY_USER_ONE } from "@/queries/UserQuery";
import {
  AppleUserData,
  InsertUserData,
  InsertUserVars,
  UserContextType,
  UserData,
  UserProviderProps,
  UserType,
} from "@/types/UserContextType";
import { useLazyQuery, useMutation } from "@apollo/client/react";
import { createContext, useState } from "react";

export const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<UserType | null>(null);
  const [InsertUser] = useMutation<InsertUserData, InsertUserVars>(
    ADD_USER_ONE
  );
  const [InsertAppleUser] = useMutation(ADD_APPLE_USER_ONE);
  const [getAppleUser] = useLazyQuery<AppleUserData>(QUERY_APPLE_USER);
  const [getUserById] = useLazyQuery<UserData>(QUERY_USER_ONE);

  async function appleLogin(providerId: string) {
    try {
      const appleData = await getAppleUser({
        variables: { provider_id: providerId },
      });

      const userId = appleData.data?.apple_users_by_pk?.user_id;
      if (!userId) throw new Error("Apple user not found");

      const userData = await getUserById({
        variables: { id: userId },
      });

      const u = userData.data?.users_by_pk;
      if (!u) throw new Error("User not found");

      setUser({
        id: u.id,
        name: u.name,
        email: u.email,
        country: u.country,
        points: u.points,
        role: u.role,
      });
    } catch (e) {
      console.error(e);
    }
  }

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
