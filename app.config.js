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

      // Splash Screen Plugin (완벽하게 복사)
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon-dark.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],

      // Google Sign-In Plugin
      [
        "@react-native-google-signin/google-signin",
        {
          iosUrlScheme: "com.googleusercontent.apps._some_id_here_",
        },
      ],
    ],

    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },

    extra: {
      HASURA_SECRET: process.env.EXPO_PUBLIC_HASURA_ADMIN_SECRET,
      HASURA_URI: process.env.EXPO_PUBLIC_HASURA_URI,
    },
  },
};
