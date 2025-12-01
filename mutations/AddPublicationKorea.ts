import { gql } from "@apollo/client";

const INSERT_KOREA_PUBLICATION = gql`
  mutation INSERT_KOREA_PUBLICATION(
    $content: String!
    $title: String!
    $author: String!
    $id: String!
    $author_id: uuid!
  ) {
    insert_life_in_korea_one(
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

export default INSERT_KOREA_PUBLICATION;