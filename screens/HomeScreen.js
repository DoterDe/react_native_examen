import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import Hamster from "../components/Hamster";
import Upgrade from "../components/Upgrade";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const [score, setScore] = useState(0);
  const [power, setPower] = useState(1);

  const loadData = async () => {
    try {
      const storedScore = await AsyncStorage.getItem('score');
      if (storedScore !== null) {
        setScore(Number(storedScore));
      }

      const storedPower = await AsyncStorage.getItem('power');
      if (storedPower !== null) {
        setPower(Number(storedPower));
      }
    } catch (e) {
      console.error('Failed to load data', e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const saveData = async (newScore, newPower) => {
    try {
      await AsyncStorage.setItem('score', String(newScore));
      await AsyncStorage.setItem('power', String(newPower));
    } catch (e) {
      console.error('Failed to save data', e);
    }
  };

  const handleScoreUpdate = (newScore) => {
    setScore(newScore);
    saveData(newScore, power);
  };

  const handlePowerUpdate = (newPower) => {
    setPower(newPower);
    saveData(score, newPower);
  };

  return (
    <View style={styles.container}>
      <Hamster score={score} setScore={handleScoreUpdate} power={power} />
      <Upgrade score={score} setScore={handleScoreUpdate} power={power} setPower={handlePowerUpdate} />

      <View style={styles.buttonsContainer}>
        <Button
          title="Главная"
          onPress={() => navigation.navigate("Главная")}
          color="#007BFF"
        />
        <Button
          title="Магазин"
          onPress={() => navigation.navigate("Магазин")}
          color="#007BFF"
        />
        <Button
          title="Профиль"
          onPress={() => navigation.navigate("Профиль")}
          color="#007BFF"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f5f5dc",
    paddingTop: 50,
  },
  buttonsContainer: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 20,
    paddingBottom: 30,
    marginTop: 20,
    justifyContent: "space-between",
  },
});
