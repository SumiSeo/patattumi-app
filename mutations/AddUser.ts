import { gql } from "@apollo/client";

export const ADD_USER_ONE = gql`
  mutation InsertUser($email: String!, $name: String!, $provider: String!) {
    insert_users_one(
      object: { email: $email, name: $name, provider: $provider }
      on_conflict: { constraint: users_email_provider_key, update_columns: [] }
    ) {
      id
      name
      email
      provider
    }
  }
`;

export const ADD_APPLE_USER_ONE = gql`
  mutation InsertAppleUser($provider_id: String!, $user_id: uuid!) {
    insert_apple_users_one(
      object: { provider_id: $provider_id, user_id: $user_id }
    ) {
      id
    }
  }
`;
