import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'; 

export default function Upgrade({ score, setScore, power, setPower }) {

  const upgradePower = async () => {
    console.log("Текущее количество монет перед улучшением:", score);
    if (score >= 10) {

      setScore((prevScore) => {
        const newScore = prevScore - 10;
        console.log("Новые монеты после улучшения:", newScore);
        return newScore;
      });

      setPower((prevPower) => {
        const newPower = prevPower + 1;
        console.log("Новые Power после улучшения:", newPower);
        return newPower;
      });

      
      try {
        await AsyncStorage.setItem('score', String(score - 10)); 
      } catch (e) {
        console.error('Failed to save score', e);
      }

      try {
        await AsyncStorage.setItem('power', String(power + 1)); 
      } catch (e) {
        console.error('Failed to save power', e);
      }
    } else {
      console.log("Недостаточно монет для улучшения");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={upgradePower}>
        <Text style={styles.buttonText}>⚡ Улучшить (10 монет)</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#ffcc00",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
