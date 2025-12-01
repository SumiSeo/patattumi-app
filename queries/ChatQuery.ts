import { gql } from "@apollo/client";

export const QUERY_LIFE_IN_FRANCE = gql`
  query LifeInFranceQuery {
    life_in_france(order_by: { created_at: desc }) {
      id
      content
      author
      title
      created_at
    }
  }
`;

export const QUERY_LIFE_IN_FRANCOPHONE = gql`
  query LifeInFrancophoneQuery {
    life_in_francophone(order_by: { created_at: desc }) {
      id
      content
      author
      title
      created_at
    }
  }
`;

export const QUERY_LIFE_IN_KOREA = gql`
  query LifeInKoreaQuery {
    life_in_korea(order_by: { created_at: desc }) {
      author
      content
      created_at
      id
      title
    }
  }
`;

export const QUERY_COMMENTS_IN_FRANCE_BY_ID = gql`
  query CommentsInFranceByIdQuery($postId: String!) {
    comments_life_in_france(where: { post_id: { _eq: $postId } }) {
      id
      author
      content
      created_at
    }
  }
`;
export const QUERY_COMMENTS_IN_KOREA_BY_ID = gql`
  query CommentsInKoreaByIdQuery($postId: String!) {
    comments_life_in_korea(where: { post_id: { _eq: $postId } }) {
      id
      author
      content
      created_at
    }
  }
`;

export const QUERY_COMMENTS_IN_FRANCOPHONE_BY_ID = gql`
  query CommentsInFrancophoneByIdQuery($postId: String!) {
    comments_life_in_francophone(where: { post_id: { _eq: $postId } }) {
      id
      author
      content
      created_at
    }
  }
`;