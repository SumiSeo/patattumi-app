import { useUser } from "@/hooks/useUser";
import INSERT_FRANCE_PUBLICATION from "@/mutations/AddPublicationFrance";
import INSERT_FRANCOPHONE_PUBLICATION from "@/mutations/AddPublicationFrancophone";
import INSERT_KOREA_PUBLICATION from "@/mutations/AddPublicationKorea";
import {
  QUERY_LIFE_IN_FRANCE,
  QUERY_LIFE_IN_FRANCOPHONE,
  QUERY_LIFE_IN_KOREA,
} from "@/queries/ChatQuery";
import { useMutation } from "@apollo/client/react";
import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import uuid from "react-uuid";
import ThemedText from "../ThemedText";
import ThemedButton from "../ThmedButton";

export type WriteCommentProps = {
  country: string;
  setModalVisible: (modalVisible: boolean) => void;
  setOpen: (open: boolean) => void;
};

const WritePublicaton = ({
  country,
  setModalVisible,
  setOpen,
}: WriteCommentProps) => {
  const { user } = useUser();
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [insertPublicationFrance, { loading: loadingFrance }] = useMutation(
    INSERT_FRANCE_PUBLICATION
  );
  const [insertPublicationKorea, { loading: loadingKorea }] = useMutation(
    INSERT_KOREA_PUBLICATION
  );
  const [insertPublicationFrancophone, { loading: loadingFrancophone }] =
    useMutation(INSERT_FRANCOPHONE_PUBLICATION);

  const loading = loadingFrance || loadingKorea;

  const handleSubmit = async () => {
    if (comment && user?.name) {
      try {
        if (country === "korea") {
          await insertPublicationKorea({
            variables: {
              author: user?.name,
              title: title,
              content: comment,
              id: uuid(),
              author_id: user?.id,
            },
            refetchQueries: [
              {
                query: QUERY_LIFE_IN_KOREA,
              },
            ],
          });
        } else if (country === "france") {
          await insertPublicationFrance({
            variables: {
              author: user?.name,
              title: title,
              content: comment,
              id: uuid(),
              author_id: user?.id,
            },
            refetchQueries: [
              {
                query: QUERY_LIFE_IN_FRANCE,
              },
            ],
          });
        } else {
          await insertPublicationFrancophone({
            variables: {
              author: user?.name,
              title: title,
              content: comment,
              id: uuid(),
              author_id: user?.id,
            },
            refetchQueries: [
              {
                query: QUERY_LIFE_IN_FRANCOPHONE,
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
        placeholder="Titre..."
        value={title}
        onChangeText={setTitle}
        multiline
      />
      <TextInput
        style={[styles.input, { height: 200, marginBottom: 10 }]}
        placeholder="Votre contenu..."
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

export default WritePublicaton;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
  inputError: {
    borderColor: "red",
  },
});
