import { gql } from "@apollo/client";

const INSERT_COMMENT_IN_KOREA_PUBLICATION = gql`
  mutation InsertCommentKorea(
    $postId: String!
    $author: String!
    $content: String!
    $author_id: uuid!
  ) {
    insert_comments_life_in_korea_one(
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

export default INSERT_COMMENT_IN_KOREA_PUBLICATION;