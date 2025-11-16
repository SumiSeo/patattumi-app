import { gql } from "@apollo/client";

export const QUERY_APPLE_USER = gql`
  query QueryAppleUser($provider_id: String!) {
    apple_users_by_pk(provider_id: $provider_id) {
      user_id
    }
  }
`;

export const QUERY_USER_ONE = gql`
  query QueryUser($id: uuid!) {
    users_by_pk(id: $id) {
      id
      language
      email
      name
      points
      role
      age
      korean_name
      totem
    }
  }
`;
