import PatattumiLogo from "@/assets/images/favicon.png";
import AppleLogin from "@/components/Auth/AppleLogin";
import Spacer from "@/components/Spacer";
import ThemedError from "@/components/ThemedError";
import ThemedLogo from "@/components/ThemedLogo";
import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

const Login = () => {
  const { appleSignIn } = useUser();

  const [error, setError] = useState<string | null>(null);

  const fakeLogin = async () => {
    setError(null);
    try {
      const fake = "001433.54aa1ea53ed54e49a58e792388df6ccd.1346";
      await appleSignIn(fake);
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    setError(null);
  }, []);

  return (
    <ThemedView safe={true} style={styles.container}>
      <ThemedLogo url={PatattumiLogo} />
      <Spacer height={10} />
      <ThemedText title={true} style={{ fontSize: 30 }}>
        Patattumi
      </ThemedText>
      <Spacer height={10} />
      <Spacer height={30} />
      <ThemedText style={{ fontSize: 14, textAlign: "center" }}>
        Découvrez la langue et la culture coréenne
      </ThemedText>
      <ThemedText style={{ fontSize: 14, textAlign: "center" }}>
        de façon ludique en vous inscrivant.
      </ThemedText>
      <Spacer height={30} />
      <Spacer height={10} />
      <AppleLogin setError={setError} />
      <Spacer height={20} />
      {error !== null && (
        <ThemedError>
          <ThemedText
            color="red"
            style={{
              fontWeight: "bold",
            }}
          >
            {error}
          </ThemedText>
        </ThemedError>
      )}
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
