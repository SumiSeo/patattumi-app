import img1 from "@/assets/images/courses/politesse01/1.jpg";
import img2 from "@/assets/images/courses/politesse01/2.jpg";
import img3 from "@/assets/images/courses/politesse01/3.jpg";
import img4 from "@/assets/images/courses/politesse01/4.jpg";
import img5 from "@/assets/images/courses/politesse01/5.jpg";
import img6 from "@/assets/images/courses/politesse01/6.jpg";
import img7 from "@/assets/images/courses/politesse01/7.jpg";
import img8 from "@/assets/images/courses/politesse01/8.jpg";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";

import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import ThemedText from "../ThemedText";

const images = {
  "1": img1,
  "2": img2,
  "3": img3,
  "4": img4,
  "5": img5,
  "6": img6,
  "7": img7,
  "8": img8,
} as const;

type Situation = {
  id: number;
  text: string;
};

const situations: Situation[] = [
  { id: 1, text: "Avec une personne plus âgée" },
  { id: 3, text: "Pendant le repas" },
  { id: 5, text: "Avec une personne rencontrée pour la première fois" },
  { id: 7, text: "Dans les transports" },
];

const KoreanPolitesse = () => {
  const [response, setResponse] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const [gameEnd, setGameEnd] = useState(false);
  const [politesse, setPolitesse] = useState("");
  const [score, setScore] = useState(0);

  useFocusEffect(
    useCallback(() => {
      setResponse([]);
      setPage(1);
      setGameEnd(false);
      setPolitesse("");
      setScore(0);
    }, [])
  );

  useEffect(() => {
    if (!gameEnd) return;
    const goodResponses = [2, 1, 2, 2];
    const corrects = goodResponses.filter(
      (good, i) => good === response[i]
    ).length;

    if (corrects < 1) setPolitesse("Tu es très très impoli(e) !");
    else if (corrects === 1) {
      setPolitesse("Tu es très impoli(e) !");
      setScore(1);
    } else if (corrects === 2) {
      setPolitesse("Tu peux survivre en Corée !");
      setScore(2);
    } else if (corrects === 3) {
      setPolitesse("Tu seras le/la bienvenu(e) en Corée !");
      setScore(3);
    } else {
      setPolitesse("Je dirais que tu es coréen(ne) !");
      setScore(4);
    }
  }, [gameEnd]);

  const handleSelect = (index: number) => {
    setResponse((prev) => [...prev, index]);

    if (page < 7) {
      setPage((prev) => prev + 2);
    } else {
      setGameEnd(true);
    }
  };

  const displayNextImg = () => {
    const img1Key = page.toString() as keyof typeof images;
    const img2Key = (page + 1).toString() as keyof typeof images;
    const currentSituation = situations.find((s) => s.id === page);

    return (
      <View style={{ alignItems: "center"  }}>
        <ThemedText style={{ marginVertical: 10 }}>
          Situation: {currentSituation ? currentSituation.text : ""}
        </ThemedText>
        <Pressable onPress={() => handleSelect(1)}>
          <Image
            source={images[img1Key]}
            style={{ width: 200, height: 150, borderRadius: 8 }}
          />
          <ThemedText
            title
            style={{ position: "absolute", marginTop: 0, left: -30}}
          >
            1.
          </ThemedText>
        </Pressable>
        <Pressable onPress={() => handleSelect(2)}>
          <Image
            source={images[img2Key]}
            style={{ width: 200, height: 150, borderRadius: 8 }}
          />
          <ThemedText
            title
            style={{ position: "absolute", marginTop: 0, left: -30}}
          >
            2.
          </ThemedText>
        </Pressable>
      </View>
    );
  };

  return (
    <ScrollView>
      <View>
        {!gameEnd && displayNextImg()}
        {politesse !== "" && (
          <View style={{ marginVertical: 20 }}>
            <ThemedText title style={{ fontSize: 20, marginBottom: 5 }}>
              {politesse}{" "}
            </ThemedText>
            <ThemedText>Ton score : {score} / 4❤️</ThemedText>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default KoreanPolitesse;
