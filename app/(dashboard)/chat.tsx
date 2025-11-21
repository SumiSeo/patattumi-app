import ChatLocation from "@/components/Chat/ChatLocation";
import ThemedCard from "@/components/ThemedCard";
import ThemedLoader from "@/components/ThemedLoader";
import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import { QUERY_LIFE_IN_FRANCE, QUERY_LIFE_IN_KOREA } from "@/queries/ChatQuery";
import { dateFormatter } from "@/utils/games/dateFormatter";
import { useQuery } from "@apollo/client/react";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

interface Publication {
  id: string;
  author: string;
  created_at: string;
  title: string;
  content: string;
}

interface LifeInFranceData {
  life_in_france: Publication[];
}

interface LifeInKoreaData {
  life_in_korea: Publication[];
}
const Chat = () => {
  const [isFrance, setIsFrance] = useState<boolean>(true);
  const [publications, setPublications] = useState<Publication[]>([]);

  const { data, loading, refetch } = useQuery<
    LifeInFranceData | LifeInKoreaData
  >(isFrance ? QUERY_LIFE_IN_FRANCE : QUERY_LIFE_IN_KOREA);

  useEffect(() => {
    if (data) {
      if (isFrance && "life_in_france" in data) {
        setPublications(data.life_in_france);
      } else if (!isFrance && "life_in_korea" in data) {
        setPublications(data.life_in_korea);
      }
    }
  }, [data, isFrance]);

  const handleChatLocation = async () => {
    setIsFrance(!isFrance);
    refetch();
  };

  const createPublications = () => {
    return publications.map((publication) => {
      return (
        <ThemedCard key={publication?.id} style={styles.card}>
          <View style={styles.cardBox}>
            <ThemedText title style={{ fontSize: 10, color: "#333" }}>
              {publication.author}
            </ThemedText>
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
        </ThemedCard>
      );
    });
  };

  return (
    <ThemedView safe={true}>
      <ScrollView>
        <View style={styles.profileNav}>
          <ThemedText title>Chat</ThemedText>
          <ChatLocation
            isFrance={isFrance}
            handleChatLocation={handleChatLocation}
          />
        </View>
        {loading && <ThemedLoader />}
        {publications && createPublications()}
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
});
