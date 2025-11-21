import INSERT_COMMENT_IN_FRANCE_PUBLICATION from "@/mutations/AddCommentFrance";
import INSERT_COMMENT_IN_KOREA_PUBLICATION from "@/mutations/AddCommentKorea";
import {
  QUERY_COMMENTS_IN_FRANCE_BY_ID,
  QUERY_COMMENTS_IN_KOREA_BY_ID,
} from "@/queries/ChatQuery";

import { useUser } from "@/hooks/useUser";
import { useMutation } from "@apollo/client/react";
import React, { useState } from "react";
import { Alert, StyleSheet, TextInput, View } from "react-native";
import ThemedText from "../ThemedText";
import ThemedButton from "../ThmedButton";

export type WriteCommentProps = {
  id: string;
  country: "france" | "korea";
};

const WriteComment = ({ id, country }: WriteCommentProps) => {
  const { user } = useUser();
  const [author, setAuthor] = useState("");
  const [comment, setComment] = useState("");
  const [insertCommentFrance, { loading: loadingFrance }] = useMutation(
    INSERT_COMMENT_IN_FRANCE_PUBLICATION
  );
  const [insertCommentKorea, { loading: loadingKorea }] = useMutation(
    INSERT_COMMENT_IN_KOREA_PUBLICATION
  );

  const loading = loadingFrance || loadingKorea;

  const handleSubmit = async () => {
    const finalAuthor = author;
    if (!finalAuthor.trim() || !comment.trim() || loading) return;

    try {
      if (country === "korea") {
        await insertCommentKorea({
          variables: { postId: id, author: finalAuthor, content: comment },
          refetchQueries: [
            { query: QUERY_COMMENTS_IN_KOREA_BY_ID, variables: { postId: id } },
          ],
        });
      } else {
        await insertCommentFrance({
          variables: { postId: id, author: finalAuthor, content: comment },
          refetchQueries: [
            {
              query: QUERY_COMMENTS_IN_FRANCE_BY_ID,
              variables: { postId: id },
            },
          ],
        });
      }
      setAuthor("");
      setComment("");
    } catch (e) {
      Alert.alert("Error", "Failed to post comment.");
    }
  };

  return (
    <View style={{ marginTop: 10 }}>
      <ThemedText title style={{ fontSize: 12, marginBottom: 4 }}>
        {user?.name}
      </ThemedText>

      <TextInput
        style={styles.input}
        placeholder="Comment"
        value={comment}
        onChangeText={setComment}
        multiline
      />
      <ThemedButton
        text={loading ? "Loading..." : "Écrire"}
        onPress={handleSubmit}
        disabled={loading}
      />
    </View>
  );
};

export default WriteComment;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginVertical: 2,
  },
  inputError: {
    borderColor: "red",
  },
});
