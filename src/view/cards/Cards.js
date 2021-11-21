import React from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from "../app/styles";

export default function Cards({ letters, turnsCount, matchedCount, onClick }) {
  const renderItem = (item, index) => {
    return (
      <TouchableOpacity key={item.id} onPress={() => onClick(item, index)}>
        <View style={styles.card}>
          <Text style={{ ...styles.text, opacity: item.show ? 1 : 0 }}>
            {item.matched ? "🥳" : item.text}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const gameContainer = () => {
    return (
      <View style={{ display: "flex" }}>
        <View style={styles.topBarContainer}>
          <View>
            <Text style={styles.counterHeading}>MATCHES</Text>
            <Text style={styles.counterText}>{matchedCount}</Text>
          </View>
          <View>
            <Text style={styles.counterHeading}>TURNS</Text>
            <Text style={styles.counterText}>{turnsCount}</Text>
          </View>
        </View>
        <View style={styles.container}>{letters.map(renderItem)}</View>
      </View>
    );
  };

  return gameContainer();
}
