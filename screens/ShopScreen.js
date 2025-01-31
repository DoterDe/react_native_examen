import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ShopScreen({ navigation }) {
  const [power, setPower] = useState(1);
  const [score, setScore] = useState(0);
  const [itemPrice, setItemPrice] = useState(10);
  const [autoIncome, setAutoIncome] = useState(0);
  const [autoIncomePrice, setAutoIncomePrice] = useState(20);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setScore((prevScore) => prevScore + autoIncome);
    }, 1000);
    return () => clearInterval(interval);
  }, [autoIncome]);

  const handlePurchase = () => {
    if (score >= itemPrice) {
      const newScore = score - itemPrice;
      setScore(newScore);
      setItemPrice(itemPrice + 1);
      AsyncStorage.setItem('score', newScore.toString());
    }
  };

  const upgradeAutoIncome = () => {
    if (score >= autoIncomePrice) {
      const newScore = score - autoIncomePrice;
      setScore(newScore);
      setAutoIncome(autoIncome + 1);
      setAutoIncomePrice(autoIncomePrice + 5);

      setTimeout(() => {
        AsyncStorage.setItem('score', newScore.toString());
      }, 1000);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Магазин</Text>
      <Text style={styles.info}>💰 Монеты: {score}</Text>
      <Text style={styles.info}>⏳ Авто-доход: {autoIncome} / сек</Text>
      <Text style={styles.info}>🔧 Цена улучшения авто-дохода: {autoIncomePrice}</Text>


      <TouchableOpacity style={[styles.button, styles.upgradeButton]} onPress={upgradeAutoIncome}>
        <Text style={styles.buttonText}>Улучшить авто-доход (+1/сек) за {autoIncomePrice}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.homeButton]} onPress={() => navigation.navigate("Главная")}>
        <Text style={styles.buttonText}>Перейти на Главную</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5dc",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  info: {
    fontSize: 20,
    marginBottom: 10,
    color: "#555",
  },
  button: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
    width: "80%",
    elevation: 3,
  },
  upgradeButton: {
    backgroundColor: "#ffc107",
  },
  homeButton: {
    backgroundColor: "#007BFF",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
