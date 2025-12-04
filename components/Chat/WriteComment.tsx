import INSERT_COMMENT_IN_FRANCE_PUBLICATION from "@/mutations/AddCommentFrance";
import INSERT_COMMENT_IN_FRANCOPHONE_PUBLICATION from "@/mutations/AddCommentFrancophone";
import INSERT_COMMENT_IN_KOREA_PUBLICATION from "@/mutations/AddCommentKorea";
import {
  QUERY_COMMENTS_IN_FRANCE_BY_ID,
  QUERY_COMMENTS_IN_FRANCOPHONE_BY_ID,
  QUERY_COMMENTS_IN_KOREA_BY_ID,
} from "@/queries/ChatQuery";

import { useUser } from "@/hooks/useUser";
import { useMutation } from "@apollo/client/react";
import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import ThemedButton from "../ThemedButton";
import ThemedText from "../ThemedText";

export type WriteCommentProps = {
  id: string;
  country: string;
  setModalVisible: (modalVisible: boolean) => void;
  setOpen: (open: boolean) => void;
};

const WriteComment = ({
  id,
  country,
  setModalVisible,
  setOpen,
}: WriteCommentProps) => {
  const { user } = useUser();
  const [comment, setComment] = useState("");
  const [insertCommentFrance, { loading: loadingFrance }] = useMutation(
    INSERT_COMMENT_IN_FRANCE_PUBLICATION
  );
  const [insertCommentKorea, { loading: loadingKorea }] = useMutation(
    INSERT_COMMENT_IN_KOREA_PUBLICATION
  );
  const [insertCommentFrancophone, { loading: loadingFrancophone }] =
    useMutation(INSERT_COMMENT_IN_FRANCOPHONE_PUBLICATION);

  const loading = loadingFrance || loadingKorea || loadingFrancophone;

  const handleSubmit = async () => {
    if (comment && user?.name) {
      try {
        if (country === "korea") {
          await insertCommentKorea({
            variables: {
              postId: id,
              author: user?.name,
              content: comment,
              author_id: user?.id,
            },
            refetchQueries: [
              {
                query: QUERY_COMMENTS_IN_KOREA_BY_ID,
                variables: { postId: id },
              },
            ],
          });
        } else if (country === "france") {
          await insertCommentFrance({
            variables: {
              postId: id,
              author: user?.name,
              content: comment,
              author_id: user?.id,
            },
            refetchQueries: [
              {
                query: QUERY_COMMENTS_IN_FRANCE_BY_ID,
                variables: { postId: id },
              },
            ],
          });
        } else {
          await insertCommentFrancophone({
            variables: {
              postId: id,
              author: user?.name,
              content: comment,
              author_id: user?.id,
            },
            refetchQueries: [
              {
                query: QUERY_COMMENTS_IN_FRANCOPHONE_BY_ID,
                variables: { postId: id },
              },
            ],
          });
        }
        setComment("");
        setModalVisible(false);
        setOpen(false);
      } catch (e) {
        if (e instanceof Error) console.log(e);
      }
    }
  };

  return (
    <View>
      <ThemedText title style={{ fontSize: 14, marginBottom: 4 }}>
        {user?.name}
      </ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Votre commentaire..."
        value={comment}
        onChangeText={setComment}
        multiline
      />
      <ThemedButton
        text={loading ? "Loading..." : "Écrire"}
        handleSubmit={handleSubmit}
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
    padding: 10,
    marginTop: 10,
    marginBottom: 20,
    height: 100,
  },
  inputError: {
    borderColor: "red",
  },
});
