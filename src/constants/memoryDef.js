const _characters = [
  { id: 1, text: "A", show: false, matched: false },
  { id: 2, text: "B", show: false, matched: false },
  { id: 3, text: "C", show: false, matched: false },
  { id: 4, text: "D", show: false, matched: false },
  { id: 5, text: "E", show: false, matched: false },
  { id: 6, text: "F", show: false, matched: false },
  { id: 7, text: "G", show: false, matched: false },
  { id: 8, text: "H", show: false, matched: false },
  { id: 9, text: "A", show: false, matched: false },
  { id: 10, text: "B", show: false, matched: false },
  { id: 11, text: "C", show: false, matched: false },
  { id: 12, text: "D", show: false, matched: false },
  { id: 13, text: "E", show: false, matched: false },
  { id: 14, text: "F", show: false, matched: false },
  { id: 15, text: "G", show: false, matched: false },
  { id: 16, text: "H", show: false, matched: false },
];

const _genRandomChar = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const getRandomChar = () => {
  return _genRandomChar(_characters);
};

const maxCount = 2;
export { getRandomChar, maxCount };
