import { useUser } from "@/hooks/useUser";
import * as AppleAuthentication from "expo-apple-authentication";
import { StyleSheet, View } from "react-native";
import uuid from "react-uuid";

interface CodedError extends Error {
  code?: string;
}
type LoginProps = {
  setError: (err: string | null) => void;
};

export default function AppleLogin({ setError }: LoginProps) {
  const { appleSignIn, appleRegister, userExists } = useUser();
  return (
    <View>
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={5}
        style={styles.button}
        onPress={async () => {
          setError(null);
          try {
            const credential = await AppleAuthentication.signInAsync({
              requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL,
              ],
            });
            if (credential) {
              console.log(credential);
              const result = await userExists(credential.user);
              console.log(result);
              const providerId = credential.user;
              if (!result) {
                if (credential.email) {
                  const email = credential.email;
                  const name = `${credential.fullName?.givenName} ${credential.fullName?.familyName}`;
                  await appleRegister(email, name, providerId);
                } else {
                  await appleRegister(
                    "",
                    "user_" + uuid().slice(0, 8),
                    providerId
                  );
                }
              } else {
                if (providerId) await appleSignIn(providerId);
              }
            }
          } catch (e) {
            const err = e as CodedError;
            if (err.code === "ERR_REQUEST_CANCELED") {
              console.error(err);
              setError("Apple login Failed");
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
