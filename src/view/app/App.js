import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import {
  cloneArrayDeep,
  getRandomChar,
  maxCount,
} from "../../constants/memoryDef";
import Cards from "../cards/Cards";
import ResetGame from "../resetGame/ResetGame";

export default function App() {
  const [letters, setLetters] = useState(getRandomChar());
  const [matchIndexs, setMatchedIndexs] = useState([]);
  const [matchedCount, setMatchedCount] = useState(0);
  const [turnsCount, setTurnsCount] = useState(0);

  const onClick = (item, newIndex) => {
    if (!item.matched && matchIndexs.length < 2 && newIndex != matchIndexs[0]) {
      let newItems = matchIndexs;
      if (matchIndexs.length < maxCount) {
        newItems = cloneArrayDeep(letters);
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

  const resetGame = () => {
    setTurnsCount(0);
    setMatchedCount(0);
    setMatchedIndexs([]);
    setLetters(getRandomChar());
  };

  return (
    <SafeAreaView>
      {letters.length === matchedCount * 2 ? (
        <ResetGame resetGame={resetGame} />
      ) : (
        <Cards
          letters={letters}
          turnsCount={turnsCount}
          matchedCount={matchedCount}
          onClick={onClick}
        />
      )}
    </SafeAreaView>
  );
}
