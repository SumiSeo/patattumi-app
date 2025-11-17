import 'dotenv/config';

export default {
  expo: {
    name: "patattumi",
    slug: "patattumi",
    version: "1.0.0",
    ios: {
      bundleIdentifier: "com.anonymous.patattumiapp",
      supportsTablet: true,
      usesAppleSignIn: true,
    },
    android: {
      package: "com.anonymous.patattumiapp",
      adaptiveIcon: {
        foregroundImage: "./assets/icons/adaptive-icon.png",
        monochromeImage: "./assets/icons/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
    extra: {
      HASURA_SECRET: process.env.EXPO_PUBLIC_HASURA_ADMIN_SECRET,
      HASURA_URI: process.env.EXPO_PUBLIC_HASURA_URI,
    },
  },
};
