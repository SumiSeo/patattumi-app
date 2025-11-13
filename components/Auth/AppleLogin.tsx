import * as AppleAuthentication from "expo-apple-authentication";
import { StyleSheet, View } from "react-native";

interface CodedError extends Error {
  code?: string;
}
type LoginProps = {
  setError: (err: boolean) => void;
  setLoggedIn: (logged: boolean) => void;
};

export default function AppleLogin({ setLoggedIn, setError }: LoginProps) {
  return (
    <View>
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={5}
        style={styles.button}
        onPress={async () => {
          try {
            const credential = await AppleAuthentication.signInAsync({
              requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL,
              ],
            });
            // signed in
            if (credential) {
              console.log("credential", credential);
              //set up to db, and asyncstorage ->
              setLoggedIn(true);
            }
          } catch (e) {
            const err = e as CodedError;
            if (err.code === "ERR_REQUEST_CANCELED") {
              console.error(err);
              setError(true);
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
