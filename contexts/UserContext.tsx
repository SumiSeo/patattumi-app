import { ADD_APPLE_USER_ONE, ADD_USER_ONE } from "@/mutations/AddUser";
import { QUERY_APPLE_USER, QUERY_USER_ONE } from "@/queries/UserQuery";
import {
  AppleUserData,
  InsertAppleUserData,
  InsertUserData,
  InsertUserVars,
  UserContextType,
  UserData,
  UserProviderProps,
  UserType,
} from "@/types/UserContextType";
import { useLazyQuery, useMutation } from "@apollo/client/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<UserType | null>(null);
  const [authChecked, setAuthChecked] = useState<boolean>(false);
  const [InsertUser] = useMutation<InsertUserData, InsertUserVars>(
    ADD_USER_ONE
  );
  const [InsertAppleUser] =
    useMutation<InsertAppleUserData>(ADD_APPLE_USER_ONE);
  const [getAppleUser] = useLazyQuery<AppleUserData>(QUERY_APPLE_USER, {
    fetchPolicy: "network-only",
    errorPolicy: "all",
  });
  const [getUserById] = useLazyQuery<UserData>(QUERY_USER_ONE, {
    fetchPolicy: "network-only",
    errorPolicy: "all",
  });

  async function getInitialUserValue() {
    try {
      const value = await AsyncStorage.getItem("user");
      if (value) {
        const userObj = JSON.parse(value);
        if (value) setUser(userObj);
      }
    } catch (error) {
      if (error instanceof Error) setUser(null);
    } finally {
      setAuthChecked(true);
    }
  }

  useEffect(() => {
    getInitialUserValue();
  }, []);

  async function appleSignIn(providerId: string) {
    try {
      const appleData = await getAppleUser({
        variables: { provider_id: providerId },
      });
      if (appleData.error) throw new Error(appleData.error.message);

      const userId = appleData.data?.apple_users_by_pk?.user_id;
      if (!userId) throw new Error("Something went wrong!");

      const userData = await getUserById({
        variables: { id: userId },
      });
      if (userData.error) throw new Error(userData.error.message);
      const u = userData.data?.users_by_pk;
      if (!u) throw new Error("Something went wrong!");
      const userObj = {
        id: u.id,
        name: u.name,
        email: u.email,
        country: u.country,
        points: u.points,
        role: u.role,
      };
      setUser(userObj);
      await AsyncStorage.setItem("user", JSON.stringify(userObj));
    } catch (e: any) {
      throw Error(e.message);
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
        const res = await InsertAppleUser({
          variables: {
            provider_id,
            user_id: id,
          },
        });
        const providerId = res.data?.insert_apple_users_one?.provider_id;
        if (providerId) await appleSignIn(providerId);
      }
    } catch (e) {
      if (e instanceof Error) throw Error(e.message);
    }
  }

  async function logout() {}
  return (
    <UserContext.Provider
      value={{ user, appleSignIn, logout, appleRegister, authChecked }}
    >
      {children}
    </UserContext.Provider>
  );
}
