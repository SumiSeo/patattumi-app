import { useUser } from "@/hooks/useUser";
import { StyleSheet } from "react-native";

import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import React, { useEffect, useState } from "react";

const GoogleLogin = () => {
  const [isInProgress, setIsInProgress] = useState(false);
  useEffect(() => {
    GoogleSignin.configure({
      iosClientId:
        "989994337201-v68moe6gb6qrni608ik4or3v3gm50g6t.apps.googleusercontent.com",
      profileImageSize: 150,
    });
  }, []);

  const { googleSignIn } = useUser();
  const handleGoogleSignIn = async () => {
    try {
      setIsInProgress(true);
      await googleSignIn();
      setIsInProgress(false);
    } catch (e) {
      console.log(e);
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
