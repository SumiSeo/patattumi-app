import 'dotenv/config';

export default {
  expo: {
    extra: {
      HASURA_SECRET: process.env.EXPO_PUBLIC_HASURA_ADMIN_SECRET,
      HASURA_URI: process.env.EXPO_PUBLIC_HASURA_URI,
    },
  },
};
