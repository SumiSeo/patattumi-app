import appleUserFetch from "@/app/api/auth/appleUserFetch";
import googleUserFetch from "@/app/api/auth/googleUserFetch";
import providerSignIn from "@/app/api/auth/login";
import register from "@/app/api/auth/register";
import fetchUserById from "@/app/api/users/getUser";
import {
  DELETE_GOOGLE_USER_ONE,
  DELETE_USER_ONE,
} from "@/mutations/DeleteUser";
import {
  UserContextType,
  UserProviderProps,
  UserType,
} from "@/types/UserContextType";
import { useMutation } from "@apollo/client/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
export const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<UserType | null>(null);
  const [authChecked, setAuthChecked] = useState<boolean>(false);

  // delete
  const [deleteUser] = useMutation(DELETE_USER_ONE);
  const [deleteGoogleUser] = useMutation(DELETE_GOOGLE_USER_ONE);

  async function getInitialUserValue() {
    try {
      const value = await AsyncStorage.getItem("user");
      console.log("Value", value);
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

  async function signIn(userId: string, provider: string, providerId: string) {
    try {
      const providerUser = await providerSignIn(provider, providerId);
      const token = providerUser.access_token;
      const u = await fetchUserById(userId);
      if (!u) throw new Error("Something went wrong with Apple Login.");
      const userObj = {
        id: u.id,
        name: u.name,
        email: u.email,
        korean_name: u?.korean_name,
        age: u.age,
        totem: u.totem,
        role: u.role,
        provider: u.provider,
        token: token,
      };
      setUser(userObj);
      await AsyncStorage.setItem("user", JSON.stringify(userObj));
    } catch (e: any) {
      throw Error(e.message);
    } finally {
      setAuthChecked(true);
    }
  }

  async function googleUserExists(providerId: string) {
    try {
      const googleData = await googleUserFetch(providerId);
      if (googleData?.user_id) return googleData?.user_id;
      else return null;
    } catch (e: any) {
      throw Error(e.message);
    }
  }

  async function userExists(providerId: string) {
    try {
      const appleData = await appleUserFetch(providerId);

      if (appleData?.user_id) return appleData?.user_id;
      else return null;
    } catch (e: any) {
      throw Error(e.message);
    }
  }

  async function googleRegister(
    email: string,
    name: string,
    provider_id: string
  ) {
    try {
      const response = await register(email, name, "google", provider_id);
      if (response) await signIn(response.id, "google", provider_id);
    } catch (e) {
      if (e instanceof Error) throw Error(e.message);
    }
  }
  async function appleRegister(
    email: string,
    name: string,
    provider_id: string
  ) {
    try {
      const response = await register(email, name, "apple", provider_id);
      if (response) await signIn(response.id, "apple", provider_id);
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
      await logout();
    }
  }

  async function googleDeleteUser(id: string) {
    const result = await deleteGoogleUser({
      variables: {
        id,
      },
    });
    if (result) {
      await logout();
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        logout,
        appleRegister,
        authChecked,
        appleDeleteUser,
        userExists,
        googleUserExists,
        googleRegister,
        googleDeleteUser,
        signIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
