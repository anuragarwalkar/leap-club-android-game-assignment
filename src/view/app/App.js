import React, { useState } from "react";
import { Button, SafeAreaView, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { clone, getRandomChar, maxCount } from "../../constants/memoryDef";
import styles from "./styles";

export default function App() {
  const [letters, setLetters] = useState(getRandomChar());
  const [matchIndexs, setMatchedIndexs] = useState([]);
  const [matchedCount, setMatchedCount] = useState(0);
  const [turnsCount, setTurnsCount] = useState(0);

  const onClick = (item, newIndex) => {
    if (!item.matched && matchIndexs.length < 2 && newIndex != matchIndexs[0]) {
      let newItems = matchIndexs;
      if (matchIndexs.length < maxCount) {
        newItems = clone(letters);
        newItems[newIndex].show = !newItems[newIndex].show;
      }

      if (matchIndexs.length === 1) {
        const [oldIndex] = matchIndexs;
        if (letters[oldIndex].text === letters[newIndex].text) {
          newItems[oldIndex].matched = true;
          newItems[newIndex].matched = true;
          setMatchedCount(matchedCount + 1);
        }
        setTimeout(() => {
          if (!newItems[oldIndex].matched && !newItems[oldIndex].matched) {
            newItems[oldIndex].show = false;
            newItems[newIndex].show = false;
          }
          setMatchedIndexs([]);
          setTurnsCount(turnsCount + 1);
          setLetters(newItems);
        }, 600);
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
          <View style={styles.resetGameContainer}>
            <Button onPress={resetGame} title="Restart Game" />
          </View>
        </View>
      ) : (
        gameContainer()
      )}
    </SafeAreaView>
  );
}
