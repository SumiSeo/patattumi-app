import createPostFrance from "@/app/api/posts/createPostFrance";
import createPostFrancophone from "@/app/api/posts/createPostFrancophone";
import createPostKorea from "@/app/api/posts/createPostKorea";
import { useUser } from "@/hooks/useUser";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const { user, logout } = useUser();
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!comment || !user?.name) return;

    setLoading(true);

    try {
      switch (country) {
        case "korea":
          await createPostKorea(title, comment, user.token);
          break;
        case "france":
          await createPostFrance(title, comment, user.token);
          break;
        case "francophone":
          await createPostFrancophone(title, comment, user.token);
          break;
        default:
          console.warn("Unknown country:", country);
          return;
      }

      setNewlyPublished((prev) => !prev);
      setComment("");
      setModalVisible(false);
      setOpen(false);
    } catch (err: any) {
      if (err.message === "Token Expired") {
        await logout();
        return;
      }
      console.error("Failed to create post:", err.message || err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <ThemedText title style={{ fontSize: 14, marginBottom: 4 }}>
        {user?.name}
      </ThemedText>
      <TextInput
        style={styles.input}
        placeholder={t("chat.title")}
        value={title}
        onChangeText={setTitle}
        multiline
      />
      <TextInput
        style={[styles.input, { height: 200, marginBottom: 10 }]}
        placeholder={t("chat.content")}
        value={comment}
        onChangeText={setComment}
        multiline
      />
      <ThemedButton
        text={loading ? t("chat.loading") : t("chat.write")}
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
