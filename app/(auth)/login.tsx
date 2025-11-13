import PatattumiLogo from "@/assets/images/favicon.png";
import AppleLogin from "@/components/Auth/AppleLogin";
import Spacer from "@/components/Spacer";
import ThemedLogo from "@/components/ThemedLogo";
import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import { useRouter } from "expo-router";

import React, { useEffect, useState } from "react";

import { StyleSheet } from "react-native";
const Login = () => {
  const router = useRouter();

  const [error, setError] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (loggedIn) {
      router.navigate("/profile");
    }
    if (error) {
      console.log("ERROR");
    }
  }, [error, loggedIn, router]);

  return (
    <ThemedView safe={true} style={styles.container}>
      <ThemedLogo url={PatattumiLogo} />
      <Spacer height={10} />
      <ThemedText title={true} style={{ fontSize: 25 }}>
        Patattumi
      </ThemedText>
      <Spacer height={20} />
      <ThemedText style={{ fontSize: 18, fontWeight: "bold" }}>
        Votre avatar coréen vous attend !
      </ThemedText>
      <Spacer height={15} />
      <ThemedText style={{ fontSize: 14, textAlign: "center" }}>
        Découvrez la langue et la culture coréenne
      </ThemedText>
      <ThemedText style={{ fontSize: 14, textAlign: "center" }}>
        de façon ludique en vous inscrivant.
      </ThemedText>
      <Spacer height={30} />

      <AppleLogin setError={setError} setLoggedIn={setLoggedIn} />
      <Spacer height={10} />
      {/* <GoogleLogin /> */}
      {/* <AppleLogin /> */}
    </ThemedView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
