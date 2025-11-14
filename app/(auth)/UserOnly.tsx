import { useUser } from "@/hooks/useUser";
import { useRouter } from "expo-router";
import React, { ReactNode, useEffect } from "react";
import { Text } from "react-native";

const UserOnly = ({ children }: { children: ReactNode }) => {
  const { user, authChecked } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (authChecked && user === null) {
      router.replace("/login");
    }
  }, [user, authChecked,router]);
  if (!authChecked || !user) return <Text>Loading...</Text>;
  return children;
};

export default UserOnly;
