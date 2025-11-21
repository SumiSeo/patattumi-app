import { gql } from "@apollo/client";

const INSERT_FRANCE_PUBLICATION = gql`
  mutation INSERT_FRANCE_PUBLICATION(
    $content: String!
    $title: String!
    $author: String!
    $id: String!
  ) {
    insert_life_in_france_one(
      object: { title: $title, content: $content, author: $author, id: $id }
    ) {
      id
      title
      content
      author
    }
  }
`;

export default INSERT_FRANCE_PUBLICATION;