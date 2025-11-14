import { GoogleSignin } from "@react-native-google-signin/google-signin";
import React from "react";
import { Pressable, Text } from "react-native";

const onGoogleLogin = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const response = await GoogleSignin.signIn();
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

const GoogleLogin = () => {
  return (
    <Pressable onPress={onGoogleLogin}>
      <Text>Sign in with Google</Text>
    </Pressable>
  );
};

export default GoogleLogin;
