import { ADD_APPLE_USER_ONE, ADD_USER_ONE } from "@/mutations/AddUser";
import { DELETE_USER_ONE } from "@/mutations/DeleteUser";
import {
  QUERY_APPLE_USER,
  QUERY_GOOGLE_USER,
  QUERY_USER_ONE,
} from "@/queries/UserQuery";
import {
  AppleUserData,
  GoogleUserData,
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
  const [deleteUser] = useMutation(DELETE_USER_ONE);
  const [InsertAppleUser] =
    useMutation<InsertAppleUserData>(ADD_APPLE_USER_ONE);
  const [getAppleUser] = useLazyQuery<AppleUserData>(QUERY_APPLE_USER, {
    fetchPolicy: "network-only",
    errorPolicy: "all",
  });
  const [getGoogleUser] = useLazyQuery<GoogleUserData>(QUERY_GOOGLE_USER, {
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

  async function userExists(providerId: string) {
    try {
      const appleData = await getAppleUser({
        variables: { provider_id: providerId },
      });
      if (
        appleData?.data?.apple_users_by_pk !== null &&
        appleData?.data?.apple_users_by_pk !== undefined
      )
        return true;
      else return false;
    } catch (e: any) {
      throw Error(e.message);
    }
  }

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
        korean_name: u.korean_name,
        age: u.age,
        totem: u.totem,
        language: u.language,
        points: u.points,
        role: u.role,
      };
      setUser(userObj);
      await AsyncStorage.setItem("user", JSON.stringify(userObj));
    } catch (e: any) {
      throw Error(e.message);
    } finally {
      setAuthChecked(true);
    }
  }

  async function googleSignIn() {
    try {
    } catch (error) {
      console.error(error);
    }
  }

  async function googleRegister(
    email: string,
    name: string,
    provider_id: string
  ) {
    try {
    } catch (error) {
      console.error(error);
    }
  }

  async function googleUserExists(providerId: string) {
    try {
      const googleData = await getGoogleUser({
        variables: { provider_id: providerId },
      });
      console.log(googleData.data);
      if (
        googleData?.data?.google_users_by_pk !== null &&
        googleData?.data?.google_users_by_pk !== undefined
      )
        return true;
      else return false;
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
        await InsertAppleUser({
          variables: {
            provider_id: provider_id,
            user_id: id,
          },
        });

        if (provider_id) await appleSignIn(provider_id);
      }
    } catch (e) {
      if (e instanceof Error) throw Error(e.message);
    }
  }

  async function logout() {
    await AsyncStorage.removeItem("user");
    setUser(null);
  }

  async function appleDeleteUser(id: string) {
    const result = await deleteUser({
      variables: {
        id,
      },
    });
    if (result) {
      console.log(result);
      await logout();
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        appleSignIn,
        logout,
        appleRegister,
        authChecked,
        appleDeleteUser,
        userExists,
        googleSignIn,
        googleUserExists,
        googleRegister,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
