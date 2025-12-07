import createPostFrance from "@/app/api/posts/createPostFrance";
import createPostFrancophone from "@/app/api/posts/createPostFrancophone";
import createPostKorea from "@/app/api/posts/createPostKorea";
import { useUser } from "@/hooks/useUser";
import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import ThemedButton from "../ThemedButton";
import ThemedText from "../ThemedText";

export type WriteCommentProps = {
  country: string;
  setModalVisible: (modalVisible: boolean) => void;
  setNewlyPublished: React.Dispatch<React.SetStateAction<boolean>>;
  setOpen: (open: boolean) => void;
};

const WritePublicaton = ({
  country,
  setModalVisible,
  setOpen,
  setNewlyPublished,
}: WriteCommentProps) => {
  const { user } = useUser();
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (comment && user?.name) {
      try {
        setLoading(true);
        if (country === "korea") {
          await createPostKorea(title, comment, user?.token);
        } else if (country === "france") {
          await createPostFrance(title, comment, user?.token);
        } else {
          await createPostFrancophone(title, comment, user?.token);
        }
        setNewlyPublished((prev) => !prev);
        setComment("");
        setModalVisible(false);
        setOpen(false);
        setLoading(false);
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
