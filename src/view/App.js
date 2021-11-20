import React, { useState } from "react";
import {
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
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

  const mainGameContainer = () => {
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

  const resetGame = () => {
    setTurnsCount(0);
    setMatchedCount(0);
    setMatchedIndexs([]);
    setLetters(getRandomChar());
  };

  return (
    <SafeAreaView>
      {letters.length === matchedCount * 2 ? (
        <View style={styles.winnerContainer}>
          <Text style={styles.winnerText}>✅ You won the game </Text>
          <View style={{ marginTop: 20 }}>
            <Button onPress={resetGame} title="Restart Game" />
          </View>
        </View>
      ) : (
        mainGameContainer()
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  winnerContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: getWidth(),
    height: getHeight(),
  },
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  card: {
    width: getWidth() / 4.5,
    height: getHeight() / 5,
    backgroundColor: "#C216F5",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderRadius: 5,
  },
  text: {
    fontSize: 50,
  },
  counterText: { textAlign: "center", fontSize: getWidth() * 0.05 },
  topBarContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: StatusBar.currentHeight + 10,

    marginBottom: 20,
  },
  counterHeading: {
    fontWeight: "bold",
    fontSize: getWidth() * 0.04,
  },
  winnerText: {
    fontSize: getWidth() * 0.09,
  },
});
