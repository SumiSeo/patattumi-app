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

export const QUERY_RECIPE = gql`
  query RecipeQuery($id: Int!) {
    recipes_by_pk(id: $id) {
      id
      name
      description
      image
      insta
      recipe
      tiktok
      youtube
    }
  }
`;
