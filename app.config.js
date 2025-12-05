import 'dotenv/config';

export default ({ config }) => {
  const profile = process.env.EAS_PROFILE;
  const isDev = profile === "development";

  const schemeBase = "patattumiapp";
  const scheme = isDev ? `${schemeBase}-dev` : schemeBase;

  return {
    ...config,

    scheme,
    runtimeVersion: "1.0.0",

    ios: {
      ...(config.ios ?? {}),
      bundleIdentifier: "com.patattumi.app",
      supportsTablet: true,
      usesAppleSignIn: true,
      icon: "./assets/icons/ios-light.png",

      infoPlist: {
        ...(config.ios?.infoPlist ?? {}),
        ITSAppUsesNonExemptEncryption: false,
        NSCalendarsUsageDescription:
          "Cette application nécessite l'accès au calendrier.",
        NSRemindersUsageDescription:
          "Cette application nécessite l'accès aux rappels.",
      },

      associatedDomains: ["applinks:patattumi.app"],
    },

    android: {
      ...(config.android ?? {}),
      package: "com.patattumi.app",
      adaptiveIcon: {
        foregroundImage: "./assets/icons/adaptive-icon.png",
        monochromeImage: "./assets/icons/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
    },

    extra: {
      ...(config.extra ?? {}),
      eas: {
        projectId: "cadbabd6-b763-487b-9497-3e198c9ac77e",
      },
      HASURA_SECRET: process.env.HASURA_ADMIN_SECRET,
      HASURA_URI: process.env.HASURA_URI,
      GOOGLE_IOS_CLIENT_ID: process.env.GOOGLE_IOS_CLIENT_ID,
      DATA_KOREAN_PUBLIC_HOLIDAY_API_KEY:
        process.env.DATA_KOREAN_PUBLIC_HOLIDAY_API_KEY,
    },

    plugins: [
      ...(config.plugins ?? []),
      [
        "@react-native-google-signin/google-signin",
        {
          iosUrlScheme:
            "com.googleusercontent.apps.989994337201-v68moe6gb6qrni608ik4or3v3gm50g6t",
        },
      ],
    ],
  };
};
