import 'dotenv/config';

export default {
  expo: {
    name: "Patattumi",
    slug: "Patattumi",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icons/ios-light.png",
    scheme: "patattumiapp",
    userInterfaceStyle: "light",
    newArchEnabled: true,

    ios: {
      bundleIdentifier: "com.patattumi.app",
      supportsTablet: true,
      usesAppleSignIn: true,
      icon: "./assets/icons/ios-light.png",

      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
        NSCalendarsUsageDescription:
          "Cette application nécessite l'accès au calendrier.",
        NSRemindersUsageDescription:
          "Cette application nécessite l'accès aux rappels.",
      },
    },

    android: {
      package: "com.patattumi.app",
      adaptiveIcon: {
        foregroundImage: "./assets/icons/adaptive-icon.png",
        monochromeImage: "./assets/icons/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
    },

    web: {
      output: "static",
      favicon: "./assets/icons/ios-light.png",
    },

    plugins: [
      "expo-router",
      "expo-apple-authentication",

      [
        "expo-splash-screen",
        {
          image: "./assets/icons/splash-icon-dark.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],

      [
        "@react-native-google-signin/google-signin",
        {
          iosUrlScheme:
            "com.googleusercontent.apps.989994337201-v68moe6gb6qrni608ik4or3v3gm50g6t",
        },
      ],
      [
        "expo-build-properties",
        {
          android: {
            usesCleartextTraffic: true,
          },
        },
      ],
    ],

    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },

    extra: {
      eas: {
        projectId: "cadbabd6-b763-487b-9497-3e198c9ac77e",
      },
      HASURA_SECRET: process.env.EXPO_PUBLIC_HASURA_ADMIN_SECRET,
      HASURA_URI: process.env.EXPO_PUBLIC_HASURA_URI,
    },
  },
};
