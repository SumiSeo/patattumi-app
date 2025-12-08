import patate from "@/assets/images/patate-baby.jpg";
import patattumi from "@/assets/images/patattumi.jpg";
import ChatLocation from "@/components/Chat/ChatLocation";
import CommentSection from "@/components/Chat/CommentSection";
import WritePublicaton from "@/components/Chat/WritePublicaton";
import ThemedCard from "@/components/ThemedCard";
import ThemedLoader from "@/components/ThemedLoader";
import ThemedModal from "@/components/ThemedModal";
import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import { useUser } from "@/hooks/useUser";
import { PostResponseList } from "@/types/post/PostType";
import { dateFormatter } from "@/utils/games/dateFormatter";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import getPosts from "../api/posts/getPostsFrance";
import getPostsFrancophone from "../api/posts/getPostsFrancophone";
import getPostsKorea from "../api/posts/getPostsKorea";

const Chat = () => {
  const [location, setLocation] = useState<string>("france");
  const [newlyPublished, setNewlyPublished] =
    useState<React.SetStateAction<boolean>>(false);
  const [publications, setPublications] = useState<PostResponseList | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);
  const [modalLocationVisible, setModalLocationVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { user, logout } = useUser();

  const fetchChat = async () => {
    if (!user) return;
    setLoading(true);
    try {
      let data;
      if (location === "france") data = await getPosts(user.token);
      else if (location === "korea") data = await getPostsKorea(user.token);
      else if (location === "francophone")
        data = await getPostsFrancophone(user.token);

      if (data) setPublications({ datas: data.datas, count: data.count });
    } catch (err: any) {
      if (err.message === "Token Expired") {
        await logout();
        return;
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChat();
  }, [location, user, newlyPublished]);

  const handleOpen = () => {
    setOpenLocation(true);
    setModalLocationVisible(true);
  };

  const handleSubmit = () => {
    setOpen(true);
    setModalVisible(true);
  };

  const createPublications = () => {
    return publications?.datas?.map((publication) => {
      return (
        <ThemedCard key={publication?.id} style={styles.card}>
          <View style={styles.cardBox}>
            <View style={styles.cardBox}>
              {publication?.owner.name === "patattumi" ? (
                <Image source={patattumi} style={styles.avatar} />
              ) : (
                <Image source={patate} style={styles.avatar} />
              )}
              <ThemedText title style={{ fontSize: 12, color: "#333" }}>
                {publication.owner.name}
              </ThemedText>
            </View>
            <ThemedText style={{ fontSize: 8, color: "#333" }}>
              {dateFormatter(publication?.created_at)}
            </ThemedText>
          </View>
          <View style={{ marginTop: 10 }}>
            <ThemedText title style={{ fontSize: 14, marginBottom: 7 }}>
              {publication.title}
            </ThemedText>
            <ThemedText style={{ fontSize: 12 }}>
              {publication.content}
            </ThemedText>
          </View>
          <CommentSection location={location} id={publication?.id} />
        </ThemedCard>
      );
    });
  };

  return (
    <ThemedView safe={true}>
      <ScrollView>
        <View style={styles.profileNav}>
          <ThemedText title style={{ fontSize: 20 }}>
            Chat in {location.slice(0, 1).toUpperCase() + location.slice(1)}
          </ThemedText>
          <View style={styles.icons}>
            <Pressable onPress={handleOpen}>
              <Ionicons size={26} name="compass-outline" />
            </Pressable>
            <ThemedModal
              visible={modalLocationVisible}
              onDismiss={() => setModalLocationVisible(false)}
            >
              <ChatLocation
                onClose={() => setModalLocationVisible(false)}
                location={location}
                handleChatLocation={(value) => setLocation(value)}
              />
            </ThemedModal>
            <Pressable onPress={handleSubmit}>
              <Ionicons size={26} name="create-outline" />
            </Pressable>
          </View>
        </View>
        <ThemedModal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
        >
          <WritePublicaton
            setNewlyPublished={setNewlyPublished}
            setModalVisible={setModalVisible}
            setOpen={setOpen}
            country={location}
          />
        </ThemedModal>
        {loading && <ThemedLoader />}
        {!loading && publications && createPublications()}
      </ScrollView>
    </ThemedView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  profileNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 7,
    marginHorizontal: 1,
  },
  card: {
    margin: 5,
    padding: 20,
    borderRadius: 12,
    backgroundColor: "#fff",
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    // Android shadow
    elevation: 4,
  },
  cardBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatar: {
    width: 20,
    height: 20,
    borderRadius: 15,
    marginRight: 5,
    marginTop: 2,
  },
  icons: {
    flexDirection: "row",
    gap: 4,
    marginRight: 2,
  },
});
