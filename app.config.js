import 'dotenv/config';

export default ({ config }) => {
  const profile = process.env.EAS_PROFILE;
  const isDev = profile === "development";

  const schemeBase = "patattumiapp";
  const scheme = isDev ? `${schemeBase}-dev` : schemeBase;

  return {
    ...config,

    scheme,

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
      GOOGLE_ADMOB_IOS_APP_ID: process.env.ADMOB_IOS_APP_ID,
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
      [
        "react-native-google-mobile-ads",
        {
          iosAppId: "ca-app-pub-5957876892202712~8420051078",
          androidAppId: "unused",
          user_tracking_usage_description:
            "This identifier will be used to deliver personalized ads to you.",
          sk_ad_network_items: [
            "cstr6suwn9.skadnetwork",
            "4fzdc2evr5.skadnetwork",
            "4pfyvq9l8r.skadnetwork",
            "2fnua5tdw4.skadnetwork",
            "ydx93a7ass.skadnetwork",
            "5a6flpkh64.skadnetwork",
            "p78axxw29g.skadnetwork",
            "v72qych5uu.skadnetwork",
            "ludvb6z3bs.skadnetwork",
            "cp8zw746q7.skadnetwork",
            "c6k4g5qg8m.skadnetwork",
            "s39g8k73mm.skadnetwork",
            "3qy4746246.skadnetwork",
            "3sh42y64q3.skadnetwork",
            "f38h382jlk.skadnetwork",
            "hs6bdukanm.skadnetwork",
            "prcb7njmu6.skadnetwork",
            "v4nxqhlyqp.skadnetwork",
            "wzmmz9fp6w.skadnetwork",
            "yclnxrl5pm.skadnetwork",
            "t38b2kh725.skadnetwork",
            "7ug5zh24hu.skadnetwork",
            "9rd848q2bz.skadnetwork",
            "y5ghdn5j9k.skadnetwork",
            "n6fk4nfna4.skadnetwork",
            "v9wttpbfk9.skadnetwork",
            "n38lu8286q.skadnetwork",
            "47vhws6wlr.skadnetwork",
            "kbd757ywx3.skadnetwork",
            "9t245vhmpl.skadnetwork",
            "a2p9lx4jpn.skadnetwork",
            "22mmun2rn5.skadnetwork",
            "4468km3ulz.skadnetwork",
            "2u9pt9hc89.skadnetwork",
            "8s468mfl3y.skadnetwork",
            "av6w8kgt66.skadnetwork",
            "klf5c3l5u5.skadnetwork",
            "ppxm28t8ap.skadnetwork",
            "424m5254lk.skadnetwork",
            "ecpz2srf59.skadnetwork",
            "uw77j35x4d.skadnetwork",
            "mlmmfzh3r3.skadnetwork",
            "578prtvx9j.skadnetwork",
            "4dzt52r2t5.skadnetwork",
            "gta9lk7p23.skadnetwork",
            "e5fvkxwrpn.skadnetwork",
            "8c4e2ghe7u.skadnetwork",
            "zq492l623r.skadnetwork",
            "3rd42ekr43.skadnetwork",
            "3qcr597p9d.skadnetwork",
          ],
        },
      ],
    ],
  };
};
