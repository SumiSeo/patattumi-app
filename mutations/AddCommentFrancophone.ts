import { gql } from "@apollo/client";

const INSERT_COMMENT_IN_FRANCOPHONE_PUBLICATION = gql`
  mutation InsertCommentFrancophone($postId: String!, $author: String!, $content: String!) {
    insert_comments_life_in_francophone_one(
      object: { post_id: $postId, author: $author, content: $content }
    ) {
      author
      content
      post_id
    }
  }
`;

export default INSERT_COMMENT_IN_FRANCOPHONE_PUBLICATION;