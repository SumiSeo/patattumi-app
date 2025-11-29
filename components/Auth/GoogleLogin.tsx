import { useUser } from "@/hooks/useUser";
import { StyleSheet } from "react-native";

import {
  GoogleSignin,
  GoogleSigninButton,
  isSuccessResponse,
} from "@react-native-google-signin/google-signin";
import Constants from "expo-constants";
import React, { useEffect, useState } from "react";

console.log(Constants.expoConfig?.ios?.bundleIdentifier);


interface CodedError extends Error {
  code?: string;
}
type LoginProps = {
  setError: (err: string | null) => void;
};

const GoogleLogin = ({ setError }: LoginProps) => {
  const { googleSignIn, googleUserExists, googleRegister } = useUser();

  const [isInProgress, setIsInProgress] = useState(false);
  useEffect(() => {
    GoogleSignin.configure({
      iosClientId:
        "989994337201-v68moe6gb6qrni608ik4or3v3gm50g6t.apps.googleusercontent.com",
      profileImageSize: 150,
    });
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      setError(null);
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        const { idToken, user } = response.data;
        const { name, email, id } = user;
        console.log(user);
        const result = await googleUserExists(id);
        if (result) {
          await googleSignIn(id);
        } else {
          if (name && email && id) await googleRegister(email, name, id);
        }
      } else {
        throw new Error("Google login Failed");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(String(error));
      }
    }
  };
  return (
    <GoogleSigninButton
      style={styles.button}
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Light}
      onPress={handleGoogleSignIn}
      disabled={isInProgress}
    />
  );
};

export default GoogleLogin;

const styles = StyleSheet.create({
  button: {
    width: 200,
    height: 44,
    marginTop: 10,
  },
});
