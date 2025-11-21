import { gql } from "@apollo/client";

const INSERT_FRANCOPHONE_PUBLICATION = gql`
  mutation INSERT_FRANCOPHONE_PUBLICATION(
    $content: String!
    $title: String!
    $author: String!
    $id: String!
  ) {
    insert_life_in_francophone_one(
      object: { title: $title, content: $content, author: $author, id: $id }
    ) {
      id
    }
  }
`;

export default INSERT_FRANCOPHONE_PUBLICATION;