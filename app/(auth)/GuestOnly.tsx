import ThemedLoader from "@/components/ThemedLoader";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "expo-router";
import React, { ReactNode, useEffect, useState } from "react";

const GuestOnly = ({ children }: { children: ReactNode }) => {
  const { user, authChecked } = useUser();
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (authChecked && user !== null) {
      setRedirecting(true);
      router.replace("/profile");
    }
  }, [authChecked, user, router]);

  if (!authChecked) return <ThemedLoader />;

  if (redirecting || user !== null) return null;

  return children;
};

export default GuestOnly;
