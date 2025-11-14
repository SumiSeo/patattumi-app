import { useUser } from "@/hooks/useUser";
import * as AppleAuthentication from "expo-apple-authentication";
import { StyleSheet, View } from "react-native";

interface CodedError extends Error {
  code?: string;
}
type LoginProps = {
  setError: (err: string) => void;
  setLoggedIn: (logged: boolean) => void;
};

export default function AppleLogin({ setLoggedIn, setError }: LoginProps) {
  const { user, appleSignIn, appleRegister } = useUser();

  return (
    <View>
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={5}
        style={styles.button}
        onPress={async () => {
          console.log("current user", user);
          try {
            const credential = await AppleAuthentication.signInAsync({
              requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL,
              ],
            });
            if (credential) {
              if (credential.email) {
                const email = credential.email;
                const name = `${credential.fullName?.givenName} ${credential.fullName?.givenName}`;
                const providerId = credential.user;
                await appleRegister(email, name, providerId);
              } else {
                const providerId = credential.user;
                await appleSignIn(providerId);
                setLoggedIn(true);
              }
            }
          } catch (e) {
            const err = e as CodedError;
            if (err.code === "ERR_REQUEST_CANCELED") {
              console.error(err);
              // setError(true);
            }
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 200,
    height: 44,
  },
});
