import patate from "@/assets/images/patate-baby.jpg";
import patattumi from "@/assets/images/patattumi.jpg";
import {
    QUERY_COMMENTS_IN_FRANCE_BY_ID,
    QUERY_COMMENTS_IN_KOREA_BY_ID,
} from "@/queries/ChatQuery";
import { useQuery } from "@apollo/client/react";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import ThemedModal from "../ThemedModal";
import ThemedText from "../ThemedText";
import ThemedButton from "../ThmedButton";
import WriteComment from "./WriteComment";

export type PublicationComment = {
  id: string;
  author: string;
  content: string;
};

interface LifeInFranceComments {
  comments_life_in_france: PublicationComment[];
}

interface LifeInKoreaComments {
  comments_life_in_korea: PublicationComment[];
}

export type CommentType = {
  id: string;
  author: string;
  content: string;
};

export type CommentSectionProps = {
  location: string;
  id: string;
};

const CommentSection = ({ location, id }: CommentSectionProps) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const { data: franceData } = useQuery<LifeInFranceComments>(
    QUERY_COMMENTS_IN_FRANCE_BY_ID,
    {
      variables: { postId: id },
      skip: location !== "france",
    }
  );

  const { data: koreaData } = useQuery<LifeInKoreaComments>(
    QUERY_COMMENTS_IN_KOREA_BY_ID,
    {
      variables: { postId: id },
      skip: location !== "korea",
    }
  );

  const handleSubmit = () => {
    setOpen(true);
    setModalVisible(true);
  };

  useEffect(() => {
    let newComments: CommentType[] = [];
    if (location === "france" && franceData) {
      newComments = franceData.comments_life_in_france;
    } else if (location === "korea" && koreaData) {
      newComments = koreaData.comments_life_in_korea;
    }
    setComments(newComments);
    setCount(newComments.length);
  }, [franceData, koreaData, location]);

  const renderComment = ({ item }: { item: CommentType }) => {
    return (
      <View style={styles.commentBox}>
        {item.author === "patattumi" ? (
          <Image source={patattumi} style={styles.avatar} />
        ) : (
          <Image source={patate} style={styles.avatar} />
        )}
        <View>
          <Text style={styles.author}>{item.author}</Text>
          <Text style={styles.content}>{item.content}</Text>
        </View>
      </View>
    );
  };

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          gap: 4,
          alignItems: "center",
          marginTop: 5,
        }}
      >
        <Ionicons size={14} name="chatbubble-outline" />
        <ThemedText title style={{ fontSize: 10 }}>
          {count}
        </ThemedText>
      </View>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={renderComment}
        style={styles.commentList}
      />
      <ThemedButton text="Écrire" handleSubmit={handleSubmit} />
      <ThemedModal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
      >
        <WriteComment
          id={id}
          country={location === "france" ? "france" : "korea"}
        />
      </ThemedModal>
    </View>
  );
};

export default CommentSection;

const styles = StyleSheet.create({
  commentList: {
    maxHeight: 200,
  },
  commentBox: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  avatar: {
    width: 15,
    height: 15,
    borderRadius: 15,
    marginRight: 5,
    marginTop: 2,
  },
  author: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 2,
  },
  content: {
    fontSize: 10,
    color: "#000",
  },
});
