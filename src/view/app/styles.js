import { StatusBar, StyleSheet } from "react-native";
import { getHeight, getWidth } from "../../utils/utilityFunc";

export default StyleSheet.create({
  winnerContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: getWidth,
    height: getHeight,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  card: {
    width: getWidth / 4.5,
    height: getHeight / 5,
    backgroundColor: "#C216F5",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderRadius: 5,
  },
  text: {
    fontSize: 50,
    color: "white",
  },
  counterText: { textAlign: "center", fontSize: getWidth * 0.05 },
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
    fontSize: getWidth * 0.04,
  },
  winnerText: {
    fontSize: getWidth * 0.09,
  },
  resetGameContainer: { marginTop: 20 },
});
