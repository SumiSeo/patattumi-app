import ThemedLoader from "@/components/ThemedLoader";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "expo-router";
import React, { ReactNode, useEffect } from "react";

const UserOnly = ({ children }: { children: ReactNode }) => {
  console.log("hi");
  const { user, authChecked } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (authChecked && user === null) {
      router.replace("/login");
    }
  }, [authChecked, user]);

  if (!authChecked) return <ThemedLoader />;

  if (authChecked && user === null) return null;

  return children;
};


export default UserOnly;
