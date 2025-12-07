import appleUserFetch from "@/app/api/auth/appleUserFetch";
import deleteAppleUser from "@/app/api/auth/deleteAppleUser";
import deleteGoogleUser from "@/app/api/auth/deleteGoogleUser";
import googleUserFetch from "@/app/api/auth/googleUserFetch";
import providerSignIn from "@/app/api/auth/login";
import register from "@/app/api/auth/register";
import fetchUserById from "@/app/api/users/getUser";
import {
  UserContextType,
  UserProviderProps,
  UserType,
} from "@/types/UserContextType";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
export const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<UserType | null>(null);
  const [authChecked, setAuthChecked] = useState<boolean>(false);

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
      if (response) {
        const token = response.access_token;
        const u = await fetchUserById(response.id);
        if (!u) throw new Error("Something went wrong with Google Login.");
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
      }
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
      if (response) {
        const token = response.access_token;
        const u = await fetchUserById(response.id);
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
    const result = await deleteAppleUser(id);
    if (result === null) {
      await logout();
    }
  }

  async function googleDeleteUser(id: string) {
    const result = await deleteGoogleUser(id);
    if (result === null) {
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
