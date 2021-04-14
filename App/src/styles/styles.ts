import { StyleSheet } from "react-native";
import colors from "./colors";

export const styles = StyleSheet.create({
  inputText: {
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 10,
    padding: 10,
    width: 370,
    height: 70,
    margin: "3%",
    fontSize: 24,
    color: colors.darkText,
    fontWeight: "bold",
    fontFamily: "Roboto",
    textAlign: "center",
    alignItems: "center",
  },
});
