import ThemedLoader from "@/components/ThemedLoader";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "expo-router";
import React, { ReactNode, useEffect } from "react";

const GuestOnly = ({ children }: { children: ReactNode }) => {
  const { user, authChecked } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (authChecked && user !== null) {
      router.replace("/profile");
    }
  }, [authChecked, user]);

  if (!authChecked) return <ThemedLoader />;

  if (authChecked && user !== null) return null;

  return children;
};

export default GuestOnly;
