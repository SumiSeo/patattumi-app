import img1 from "@/assets/images/courses/1.jpg";
import img2 from "@/assets/images/courses/2.jpg";
import img3 from "@/assets/images/courses/3.jpg";
import img4 from "@/assets/images/courses/4.jpg";
import img5 from "@/assets/images/courses/5.jpg";
import img6 from "@/assets/images/courses/6.jpg";
import img7 from "@/assets/images/courses/7.jpg";
import ThemedCard from "@/components/ThemedCard";
import ThemedView from "@/components/ThemedView";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView } from "react-native";

const images = {
  "1": img1,
  "2": img2,
  "3": img3,
  "4": img4,
  "5": img5,
  "6": img6,
  "7": img7,
} as const;

const CultureDetail = () => {
  const { id } = useLocalSearchParams();
  const key = id as keyof typeof images;

  return (
    <ThemedView safe={true}>
      <ScrollView contentContainerStyle={{ padding: 10 }}>
        <ThemedCard
          style={{ margin: 10, padding: 10, justifyContent: "center" }}
        >
          <Image
            source={images[key]}
            style={{ width: 300, height: 200, borderRadius: 10 }}
          />
        </ThemedCard>
      </ScrollView>
    </ThemedView>
  );
};

export default CultureDetail;
