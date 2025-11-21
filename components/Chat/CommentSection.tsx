import patate from "@/assets/images/patate-baby.jpg";
import patattumi from "@/assets/images/patattumi.jpg";
import {
    QUERY_COMMENTS_IN_FRANCE_BY_ID,
    QUERY_COMMENTS_IN_KOREA_BY_ID,
} from "@/queries/ChatQuery";
import { useQuery } from "@apollo/client/react";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import ThemedModal from "../ThemedModal";
import ThemedText from "../ThemedText";
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
  const [showComments, setShowComments] = useState(false);
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

  const handleShowComments = () => {
    setShowComments(!showComments);
  };
  const createCommentsList = () => {
    return comments.map((comment: CommentType) => {
      return (
        <View key={comment.id} style={styles.commentBox}>
          {comment.author === "patattumi" ? (
            <Image source={patattumi} style={styles.avatar} />
          ) : (
            <Image source={patate} style={styles.avatar} />
          )}
          <View style={styles.commentContent}>
            <Text style={styles.author}>{comment.author}</Text>
            <Text style={styles.content}>{comment.content}</Text>
          </View>
        </View>
      );
    });
  };

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <Pressable
          onPress={handleShowComments}
          style={{
            flexDirection: "row",
            gap: 4,
            alignItems: "center",
          }}
        >
          <Ionicons size={15} name="chatbubble-outline" />
          <ThemedText title style={{ fontSize: 13 }}>
            {count}
          </ThemedText>
        </Pressable>
        <Pressable onPress={handleSubmit}>
          <View style={styles.writeButton}>
            <ThemedText title style={{ fontSize: 9, color: "white" }}>
              Écrire
            </ThemedText>
          </View>
        </Pressable>
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
      {comments && showComments && createCommentsList()}
    </View>
  );
};

export default CommentSection;

const styles = StyleSheet.create({
  commentBox: {
    marginTop: 5,
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
  commentContent: {
    flex: 1,
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
  writeButton: {
    backgroundColor: "black",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
});
