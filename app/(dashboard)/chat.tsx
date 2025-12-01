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
import {
  QUERY_LIFE_IN_FRANCE,
  QUERY_LIFE_IN_FRANCOPHONE,
  QUERY_LIFE_IN_KOREA,
} from "@/queries/ChatQuery";
import { dateFormatter } from "@/utils/games/dateFormatter";
import { useQuery } from "@apollo/client/react";
import React, { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
interface Publication {
  id: string;
  author: string;
  created_at: string;
  title: string;
  content: string;
}

interface LifeInFrancophoneData {
  life_in_francophone: Publication[];
}
interface LifeInFranceData {
  life_in_france: Publication[];
}

interface LifeInKoreaData {
  life_in_korea: Publication[];
}
const Chat = () => {
  const [location, setLocation] = useState<string>("france");
  const [publications, setPublications] = useState<Publication[]>([]);
  const [open, setOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const { data, loading, refetch } = useQuery<
    LifeInFranceData | LifeInKoreaData | LifeInFrancophoneData
  >(
    location === "france"
      ? QUERY_LIFE_IN_FRANCE
      : location === "korea"
      ? QUERY_LIFE_IN_KOREA
      : QUERY_LIFE_IN_FRANCOPHONE
  );

  useEffect(() => {
    if (data) {
      if (location === "france" && "life_in_france" in data) {
        setPublications(data.life_in_france);
      } else if (location === "korea" && "life_in_korea" in data) {
        setPublications(data.life_in_korea);
      } else if (location === "francophone" && "life_in_francophone" in data) {
        setPublications(data.life_in_francophone);
      }
    }
  }, [data, location]);

  const locations = ["france", "korea", "francophone"] as const;

  const handleChatLocation = () => {
    setLocation((prev) => {
      const currentIndex = locations.indexOf(
        prev as (typeof locations)[number]
      );
      const nextIndex = (currentIndex + 1) % locations.length;
      return locations[nextIndex];
    });
    refetch();
  };

  const handleSubmit = () => {
    setOpen(true);
    setModalVisible(true);
  };

  const createPublications = () => {
    return publications.map((publication) => {
      return (
        <ThemedCard key={publication?.id} style={styles.card}>
          <View style={styles.cardBox}>
            <View style={styles.cardBox}>
              {publication.author === "patattumi" ? (
                <Image source={patattumi} style={styles.avatar} />
              ) : (
                <Image source={patate} style={styles.avatar} />
              )}
              <ThemedText title style={{ fontSize: 12, color: "#333" }}>
                {publication.author}
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
          <CommentSection location={location} id={publication.id} />
        </ThemedCard>
      );
    });
  };

  return (
    <ThemedView safe={true}>
      <ScrollView>
        <View style={styles.profileNav}>
          <ThemedText title>Chat</ThemedText>
        </View>
        <View style={styles.location}>
          <ChatLocation
            location={location}
            handleChatLocation={handleChatLocation}
          />
          <Pressable onPress={handleSubmit}>
            <View style={styles.writeButton}>
              <ThemedText title style={{ fontSize: 12, color: "white" }}>
                Écrire
              </ThemedText>
            </View>
          </Pressable>
        </View>
        <ThemedModal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
        >
          <WritePublicaton
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
    marginBottom: 10,
  },
  card: {
    margin: 5,
    padding: 20,
    borderRadius: 12,
    backgroundColor: "#fff",
    boxSizing: "border-box",

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
  writeButton: {
    backgroundColor: "black",
    padding: 8,
    borderRadius: 10,
    alignSelf: "flex-start",
    marginLeft: 10,
    marginBottom: 5,
  },
  location: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
  },
});
