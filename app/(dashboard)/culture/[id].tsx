import data from "@/app/datas/courseKoreanCulture.json";
import img1 from "@/assets/images/courses/1.jpg";
import img10 from "@/assets/images/courses/10.jpg";
import img11 from "@/assets/images/courses/11.jpg";
import img12 from "@/assets/images/courses/12.jpg";
import img2 from "@/assets/images/courses/2.jpg";
import img3 from "@/assets/images/courses/3.jpg";
import img4 from "@/assets/images/courses/4.jpg";
import img5 from "@/assets/images/courses/5.jpg";
import img6 from "@/assets/images/courses/6.jpg";
import img7 from "@/assets/images/courses/7.jpg";
import img8 from "@/assets/images/courses/8.jpg";
import img9 from "@/assets/images/courses/9.jpg";
import ThemedCard from "@/components/ThemedCard";
import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet } from "react-native";

const images = {
  "1": img1,
  "2": img2,
  "3": img3,
  "4": img4,
  "5": img5,
  "6": img6,
  "7": img7,
  "8": img8,
  "9": img9,
  "10": img10,
  "11": img11,
  "12": img12,
} as const;

const CultureDetail = () => {
  const { id } = useLocalSearchParams();
  const key = id as keyof typeof images;
  const selectedData = data.find((item) => item.id === Number(id));

  return (
    <ThemedView safe={true}>
      <ScrollView contentContainerStyle={{ padding: 10 }}>
        <ThemedCard style={styles.card}>
          <ThemedText title style={{ fontSize: 16, marginBottom: 10 }}>
            {selectedData?.course}
          </ThemedText>
          <ThemedText title style={{ fontSize: 13 }}>
            {selectedData?.title}
          </ThemedText>
          <Image
            source={images[key]}
            style={{
              width: 200,
              height: 100,
              borderRadius: 1,
              marginTop: 15,
              margin: "auto",
            }}
          />
        </ThemedCard>
      </ScrollView>
    </ThemedView>
  );
};

export default CultureDetail;

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 20,
    borderRadius: 12,
    backgroundColor: "#fff",
    marginBottom: 10,

    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,

    // Android shadow
    elevation: 4,
  },
});
