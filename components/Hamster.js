import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Hamster({ score, setScore, power }) {
  const handleAttack = async () => {
    const newScore = score + power;
    setScore(newScore);

    try {
      await AsyncStorage.setItem('score', String(newScore));
      await AsyncStorage.setItem('power', String(power));
    } catch (e) {
      console.error('Failed to save data', e);
    }
  };

  useEffect(() => {
    console.log("Обновленные монеты:", score);
    console.log("Текущая сила:", power); 
  }, [score, power]);

  return (
    <View style={styles.container}>
      <Text style={styles.score}>💰 {score} монет</Text>
      <Text style={styles.score}>⚡ Сила: {power}</Text> 
      <TouchableOpacity onPress={handleAttack}>
        <Image source={require("../assets/image.png")} style={styles.hamster} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  score: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  hamster: {
    width: 200,
    height: 200,
  },
});
