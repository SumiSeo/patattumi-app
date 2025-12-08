import createCommentFrance from "@/app/api/comments/createCommentFrance";
import createCommentFrancophone from "@/app/api/comments/createCommentFrancophone";
import createCommentKorea from "@/app/api/comments/createCommentKorea";
import { useUser } from "@/hooks/useUser";
import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import ThemedButton from "../ThemedButton";
import ThemedText from "../ThemedText";

export type WriteCommentProps = {
  id: number;
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
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (comment && user?.name) {
      try {
        setLoading(true);
        if (country === "korea") {
          await createCommentKorea(id, comment, user.token);
        } else if (country === "france") {
          await createCommentFrance(id, comment, user.token);
        } else {
          await createCommentFrancophone(id, comment, user.token);
        }
        setLoading(false);
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
