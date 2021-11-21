import React from "react";
import { Text, View } from "react-native";
import styles from "../app/styles";

export default function ResetGame({ resetGame }) {
  return (
    <View style={styles.winnerContainer}>
      <Text style={styles.winnerText}>✅ You won the game </Text>
      <View style={styles.resetGameContainer}>
        <Button onPress={resetGame} title="Restart Game" />
      </View>
    </View>
  );
}
