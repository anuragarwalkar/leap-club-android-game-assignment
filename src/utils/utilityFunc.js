import { Dimensions } from "react-native";

const getWidth = () => Dimensions.get("window").width;

const getHeight = () => Dimensions.get("window").height;

export { getWidth, getHeight };
