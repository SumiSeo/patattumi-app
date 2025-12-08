import getCommentsFrance from "@/app/api/comments/getCommentsFrance";
import getCommentsFrancophone from "@/app/api/comments/getCommentsFrancophone";
import getCommentsKorea from "@/app/api/comments/getCommentsKorea";
import patate from "@/assets/images/patate-baby.jpg";
import patattumi from "@/assets/images/patattumi.jpg";
import { useUser } from "@/hooks/useUser";
import {
  CommentResponse,
  CommentResponseList,
} from "@/types/comment/commentType";
import { dateFormatter } from "@/utils/games/dateFormatter";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import ThemedModal from "../ThemedModal";
import ThemedText from "../ThemedText";
import WriteComment from "./WriteComment";

export type CommentSectionProps = {
  location: string;
  id: number;
};

const CommentSection = ({ location, id }: CommentSectionProps) => {
  const [comments, setComments] = useState<CommentResponseList | null>(null);
  const [showComments, setShowComments] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [newlyPublished, setNewlyPublished] =
    useState<React.SetStateAction<boolean>>(false);
  const { user } = useUser();
  const handleSubmit = () => {
    setOpen(true);
    setModalVisible(true);
  };

  const fetchComments = async () => {
    if (!user) return;

    if (location === "france") {
      const data = await getCommentsFrance(id, user.token);
      setComments(data);
    } else if (location === "korea") {
      const data = await getCommentsKorea(id, user.token);
      setComments(data);
    } else if (location === "francophone") {
      const data = await getCommentsFrancophone(id, user.token);
      setComments(data);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [location, user, newlyPublished, id]);

  const handleShowComments = () => {
    setShowComments(!showComments);
  };

  const createCommentsList = () => {
    return (
      comments &&
      comments?.datas?.map((comment: CommentResponse) => {
        return (
          <View key={comment.id} style={styles.commentBox}>
            {comment.owner.name === "patattumi" ? (
              <Image source={patattumi} style={styles.avatar} />
            ) : (
              <Image source={patate} style={styles.avatar} />
            )}
            <View style={styles.commentContent}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.author}>{comment.owner.name}</Text>
                <Text style={styles.date}>
                  {dateFormatter(comment.created_at)}
                </Text>
              </View>
              <Text style={styles.content}>{comment.content}</Text>
            </View>
          </View>
        );
      })
    );
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
            marginBottom: 3,
          }}
        >
          <Ionicons size={15} name="chatbubble-outline" />
          <ThemedText title style={{ fontSize: 13 }}>
            {comments?.count}
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
            setModalVisible={setModalVisible}
            setOpen={setOpen}
            id={id}
            country={location}
            setNewlyPublished={setNewlyPublished}
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
  date: {
    fontSize: 9,
    color: "#000",
  },
  writeButton: {
    backgroundColor: "black",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
});
