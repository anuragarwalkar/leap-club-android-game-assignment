const _characters = ["A", "B", "C", "D", "E", "F", "G", "H"];

const cloneArrayDeep = (array) => {
  return array.map((item) => ({ ...item }));
};

const _genRandomChar = (array) => {
  const clonedArray = [...array];
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [clonedArray[currentIndex], clonedArray[randomIndex]] = [
      clonedArray[randomIndex],
      clonedArray[currentIndex],
    ];
  }

  return clonedArray;
};

// Return map for each item
const defIterator = () => {
  let idCounter = 0;

  // generate new default keys map
  return (item) => ({
    text: item,
    id: idCounter++,
    show: false,
    matched: false,
  });
};

const getRandomChar = () => {
  const randomChar = _genRandomChar(_characters.concat(_characters));

  // generate id and add default fields
  return randomChar.map(defIterator());
};

const maxCount = 2;
export { getRandomChar, maxCount, cloneArrayDeep };
