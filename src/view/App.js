import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getRandomChar, maxCount } from "../constants/memoryDef";
import { getHeight, getWidth } from "../utils/utilityFunc";

export default function App() {
  const [letters, setLetters] = useState(getRandomChar());
  const [matchIndexs, setMatchedIndexs] = useState([]);
  const [matchedCount, setMatchedCount] = useState(0);
  const [turnsCount, setTurnsCount] = useState(0);

  const onClick = (item, newIndex) => {
    if (!item.matched && matchIndexs.length < 2 && newIndex != matchIndexs[0]) {
      let newItems = matchIndexs;
      if (matchIndexs.length < maxCount) {
        newItems = [...letters];
        newItems[newIndex].show = !newItems[newIndex].show;
      }

      if (matchIndexs.length === maxCount - 1) {
        const [oldIndex] = matchIndexs;
        if (letters[oldIndex].text === letters[newIndex].text) {
          newItems = [...letters];
          newItems[oldIndex].matched = true;
          newItems[newIndex].matched = true;
          setMatchedCount(matchedCount + 1);
        }
        setTimeout(() => {
          newItems = [...letters];
          if (!newItems[oldIndex].matched && !newItems[oldIndex].matched) {
            newItems[oldIndex].show = false;
            newItems[newIndex].show = false;
          }

          setMatchedIndexs([]);
          setTurnsCount(turnsCount + 1);
        }, 500);
      }
      setLetters(newItems);
      setMatchedIndexs(matchIndexs.concat(newIndex));
    }
  };

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

  return (
    <SafeAreaView>
      <View>
        <Text>{matchedCount}</Text>
      </View>
      <View>
        <Text>{turnsCount}</Text>
      </View>
      <View style={styles.container}>{letters.map(renderItem)}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  card: {
    width: getWidth() / 4.5,
    height: (getHeight() - 100) / 4,
    backgroundColor: "#C216F5",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  text: {
    fontSize: 50,
  },
});
