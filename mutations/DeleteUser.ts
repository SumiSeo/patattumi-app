import { gql } from "@apollo/client";

export const DELETE_USER_ONE = gql`
  mutation DeleteUser($id: uuid!) {
    delete_apple_users(where: { user_id: { _eq: $id } }) {
      returning {
        id
      }
    }
    delete_users_by_pk(id: $id) {
      id
    }
  }
`;

export const DELETE_GOOGLE_USER_ONE = gql`
  mutation DeleteUser($id: uuid!) {
    delete_google_users(where: { user_id: { _eq: $id } }) {
      returning {
        id
      }
    }
    delete_users_by_pk(id: $id) {
      id
    }
  }
`;
