import { gql } from "@apollo/client";
export const QUERY_RECIPES = gql`
  query RecipesQuery @cached(ttl: 600) {
    recipes {
      description
      id
      image
      insta
      name
      recipe
      tiktok
      youtube
    }
  }
`;
