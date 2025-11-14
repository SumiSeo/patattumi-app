import { gql } from "@apollo/client";

export const QUERY_USER_ONE = gql`
  query QueryUser {
    users_by_pk(id: "addf3a7f-edc6-4c22-abc8-e49cc9cf1729") {
      id
      country
      email
      name
      points
      role
    }
  }
`;

export const QUERY_APPLE_USER = gql`
  query QueryAppleUser {
    apple_users_by_pk(
      provider_id: "001433.54aa1ea53ed54e49a58e792388df6ccd.1346"
    ) {
      user_id
    }
  }
`;
