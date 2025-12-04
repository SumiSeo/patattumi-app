import { useUser } from "@/hooks/useUser";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable } from "react-native";
import ThemedModal from "../ThemedModal";
import ThemedText from "../ThemedText";
import ThemedButton from "../ThmedButton";

const DeleteAccount = () => {
  const { user, appleDeleteUser, googleDeleteUser } = useUser();

  const [open, setOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const handleSubmit = () => {
    setOpen(true);
    setModalVisible(true);
  };
  const confrimDeleteUser = async () => {
    if (user?.id) {
      if (user?.provider === "google") await googleDeleteUser(user?.id);
      else await appleDeleteUser(user?.id);
    }
  };
  return (
    <>
      <Pressable
        onPress={handleSubmit}
        style={{
          minWidth: 40,
          alignItems: "flex-end",
        }}
      >
        <Ionicons size={18} name="arrow-forward-outline" />
      </Pressable>
      <ThemedModal
        style={{ marginHorizontal: 10 }}
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
      >
        <ThemedText title style={{ fontSize: 14, marginVertical: 20 }}>
          Vous souhaitez supprimer votre compte sur Patattumi ?
        </ThemedText>
        <ThemedButton handleSubmit={confrimDeleteUser} text="Confirmer" />
      </ThemedModal>
    </>
  );
};

export default DeleteAccount;
