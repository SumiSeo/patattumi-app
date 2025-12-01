import { gql } from "@apollo/client";

const INSERT_COMMENT_IN_FRANCE_PUBLICATION = gql`
  mutation InsertCommentFrance(
    $postId: String!
    $author: String!
    $content: String!
    $author_id: uuid!
  ) {
    insert_comments_life_in_france_one(
      object: {
        post_id: $postId
        author: $author
        content: $content
        author_id: $author_id
      }
    ) {
      author
      content
      post_id
    }
  }
`;

export default INSERT_COMMENT_IN_FRANCE_PUBLICATION;