import GoogleLogo from "@/assets/icons/google.png";
import { useUser } from "@/hooks/useUser";
import {
  GoogleSignin,
  isSuccessResponse,
} from "@react-native-google-signin/google-signin";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
interface LoginProps {
  setError: (err: string | null) => void;
}
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
      setIsInProgress(true);
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        const { idToken, user } = response.data;
        const { name, email, id } = user;

        const exists = await googleUserExists(id);
        if (exists) {
          await googleSignIn(id);
        } else {
          if (name && email && id) await googleRegister(email, name, id);
        }
      } else {
        throw new Error("Google login failed");
      }
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      else setError(String(error));
    } finally {
      setIsInProgress(false);
    }
  };

  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.8}
      onPress={handleGoogleSignIn}
      disabled={isInProgress}
    >
      {isInProgress ? (
        <ActivityIndicator color="#000" />
      ) : (
        <View style={styles.content}>
          <Image source={GoogleLogo} style={styles.icon} />
          <Text style={styles.text}>Se connecter avec Google</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default GoogleLogin;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 250,
    height: 44,
    backgroundColor: "#F2F2F2",
    borderRadius: 5,
    marginVertical: 10,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  text: {
    color: "#000",
    fontSize: 15,
    fontWeight: "500",
  },
});
