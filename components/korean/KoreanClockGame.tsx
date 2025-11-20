import { KoreanWithGameProps, wordsData } from "@/types/KoreanClockGameType";
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from "react";

import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const KoreanClockGame = ({ data }: wordsData) => {
  const [timeLeft, setTimeLeft] = useState(10);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [niveau, setNiveau] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [count, setCount] = useState(0);
  const [currentWord, setCurrentWord] = useState<KoreanWithGameProps | null>(
    null
  );
  const [userInput, setUserInput] = useState("");
  const intervalRef = useRef<number | null>(null);


useFocusEffect(
  useCallback(() => {
    setIsPlaying(false);
    setCount(0);
    setScore(0);
    setTimeLeft(10);
    setCurrentWord(null);
    setGameOver(false);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [])
);

  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * data.length);
    return data[randomIndex];
  };

  const startGame = () => {
    if (gameOver) setGameOver(false);

    setIsPlaying(true);
    setCurrentWord(getRandomWord());
    setCount(0);
    setScore(0);
    setTimeLeft(10); 
  };

  const calcLevel = () => {
    if (score === 0) setNiveau("nul...");
    else if (score > 0 && score < 20) setNiveau("débutant");
    else if (score >= 20 && score < 50) setNiveau("pas mal!");
    else if (score >= 50 && score < 80) setNiveau("très fort");
    else if (score >= 80) setNiveau("légende");
  };

  const endGame = () => {
    setIsPlaying(false);
    setCount(0);
    setScore(0);
    setGameOver(true);
    calcLevel();
  };

  const findNextWord = () => {
    setTimeLeft(10); 
    setCount((prev) => prev + 1);
    setCurrentWord(getRandomWord());
  };

  useEffect(() => {
    if (!isPlaying) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  useEffect(() => {
    if (timeLeft === 0 && isPlaying) {
      findNextWord();
    }
  }, [timeLeft, isPlaying]);


  useEffect(() => {
    if (isPlaying && count > 10) {
      endGame();
    }
  }, [count, isPlaying]);

  const onSubmit = () => {
    if (userInput.trim() === currentWord?.korean) {
      setScore((prev) => prev + 10);
    }
    setUserInput("");
    setCount((prev) => prev + 1);
    setCurrentWord(getRandomWord());
    setTimeLeft(10);
  };

  return (
    <View>
      <TouchableOpacity onPress={startGame} style={styles.startBtn}>
        <Text style={styles.startBtnText}>
          {!isPlaying ? "Let's GO" : "Encore"}
        </Text>
      </TouchableOpacity>

      <View style={styles.timerCircle}>
        <Text style={styles.timerText}>
          {isPlaying ? ` ${timeLeft}` : "10"}
        </Text>
      </View>

      <View style={styles.progressBG}>
        <View
          style={[styles.progressFill, { width: `${(count / 10) * 100}%` }]}
        />
      </View>

      <Text style={styles.wordText}>
        {isPlaying && currentWord && !gameOver ? currentWord.signification : ""}
      </Text>

      {isPlaying && (
        <TextInput
          placeholder="Tape ta réponse et valide"
          style={styles.input}
          value={userInput}
          onChangeText={setUserInput}
          onSubmitEditing={onSubmit}
        />
      )}

      {gameOver && <Text style={styles.levelText}>Tu es {niveau}.</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontSize: 16, fontWeight: "600" },
  startBtn: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginTop:10,
  },
  startBtnText: { color: "white", fontWeight: "700", textAlign: "center" },

  timerCircle: {
    marginTop: 30,
    alignSelf: "center",
    width: 80,
    height: 80,
    borderRadius: 100,
    borderWidth: 6,
    borderColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  timerText: { fontSize: 28, fontWeight: "900", color: "red" },
  progressBG: {
    width: "100%",
    height: 14,
    backgroundColor: "#eee",
    borderRadius: 10,
    marginTop: 20,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "red",
  },
  image: { width: "100%", height: 160, marginVertical: 20 },
  wordText: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 20,
    fontWeight: "700",
  },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
  },
  levelText: {
    marginVertical: 10,
    fontSize: 22,
    textAlign: "center",
    fontWeight: "700",
  },
});

export default KoreanClockGame;
