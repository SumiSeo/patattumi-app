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
  const { signIn, appleRegister, userExists } = useUser();
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
              const appleUser = await userExists(credential.user);
              const providerId = credential.user;
              if (appleUser === null) {
                if (credential.email) {
                  const email = credential.email;
                  const name = `${credential.fullName?.givenName} ${credential.fullName?.familyName}`;
                  if (email && name && providerId)
                    await appleRegister(email, name, providerId);
                } else {
                  await appleRegister(
                    `${uuid().slice(0, 8)}@apple.com`,
                    "user_" + uuid().slice(0, 8),
                    providerId
                  );
                }
              } else {
                if (providerId) await signIn(appleUser, "apple", providerId);
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
    width: 250,
    height: 44,
  },
});
