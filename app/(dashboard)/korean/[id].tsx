import data from "@/app/datas/courseKoreanLanguage.json";
import course01 from "@/app/datas/koreanWords/korean01.json";
import course02 from "@/app/datas/koreanWords/korean02.json";
import course03 from "@/app/datas/koreanWords/korean03.json";
import course04 from "@/app/datas/koreanWords/korean04.json";
import course05 from "@/app/datas/koreanWords/korean05.json";
import course06 from "@/app/datas/koreanWords/korean06.json";
import img1 from "@/assets/images/courses/korean/1.jpg";
import img2 from "@/assets/images/courses/korean/2.jpg";
import img3 from "@/assets/images/courses/korean/3.jpg";
import img4 from "@/assets/images/courses/korean/4.jpg";
import img5 from "@/assets/images/courses/korean/5.jpg";
import img6 from "@/assets/images/courses/korean/6.jpg";
import KoreanClockGame from "@/components/korean/KoreanClockGame";
import KoreanWord from "@/components/korean/KoreanWord";
import ThemedCard from "@/components/ThemedCard";
import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Image, ScrollView, StyleSheet } from "react-native";
const images = {
  "1": img1,
  "2": img1,
  "3": img2,
  "4": img2,
  "5": img3,
  "6": img3,
  "7": img4,
  "8": img4,
  "9": img5,
  "10": img5,
  "11": img6,
  "12": img6,
} as const;

const KoreanLessonDetail = () => {
  const { t } = useTranslation();
  const { id } = useLocalSearchParams();
  const key = id as keyof typeof images;
  const selectedData = data.find((item) => item.id === Number(id));
  const findCorrectGame = () => {
    if (id === "1") return <KoreanClockGame data={course01} />;
    if (id === "2") return <KoreanWord data={course01} />;
    if (id === "3") return <KoreanClockGame data={course02} />;
    if (id === "4") return <KoreanWord data={course02} />;
    if (id === "5") return <KoreanClockGame data={course03} />;
    if (id === "6") return <KoreanWord data={course03} />;
    if (id === "7") return <KoreanClockGame data={course04} />;
    if (id === "8") return <KoreanWord data={course04} />;
    if (id === "9") return <KoreanClockGame data={course05} />;
    if (id === "10") return <KoreanWord data={course05} />;
    if (id === "11") return <KoreanClockGame data={course06} />;
    if (id === "12") return <KoreanWord data={course06} />;
  };
  return (
    <ThemedView safe={true}>
      <ScrollView contentContainerStyle={{ padding: 10 }}>
        <ThemedCard style={styles.card}>
          <ThemedText title style={{ fontSize: 16, marginBottom: 10 }}>
            {selectedData?.type === "korean" &&
              selectedData?.course + " " + t("courses.korean")}
            {selectedData?.type === "explain" &&
              selectedData?.course + " " + t("courses.explain")}
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
          {findCorrectGame()}
        </ThemedCard>
      </ScrollView>
    </ThemedView>
  );
};

export default KoreanLessonDetail;

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 20,
    borderRadius: 12,
    backgroundColor: "#fff",
    marginBottom: 10,
    boxSizing: "border-box",

    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,

    // Android shadow
    elevation: 4,
  },
});
