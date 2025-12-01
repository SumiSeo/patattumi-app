import { gql } from "@apollo/client";

const INSERT_FRANCOPHONE_PUBLICATION = gql`
  mutation INSERT_FRANCOPHONE_PUBLICATION(
    $content: String!
    $title: String!
    $author: String!
    $id: String!
    $author_id: uuid!
  ) {
    insert_life_in_francophone_one(
      object: {
        title: $title
        content: $content
        author: $author
        id: $id
        author_id: $author_id
      }
    ) {
      id
    }
  }
`;

export default INSERT_FRANCOPHONE_PUBLICATION;