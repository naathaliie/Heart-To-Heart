import { View, Text, Pressable, StyleSheet } from "react-native";
import colors from "../styles/colors.js";

type PrimaryBtnProps = {
  title: string;
  onPress?: () => void;
  color: "dustyCherryDark" | "deliciousGreen";
  size: "small" | "big";
};

export default function PrimaryBtn({
  title,
  onPress,
  color,
  size,
}: PrimaryBtnProps) {
  //Stil baserat på props
  const btnStyle = [styles.btnBase, styles[color], styles[size]];

  //Om ingen onPress skickats med
  function defaultFunction() {
    console.log("Ingen onPress-funktion medskickad");
  }

  return (
    <Pressable
      onPress={onPress ? () => onPress() : () => defaultFunction()}
      style={btnStyle}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btnBase: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 5,
    borderWidth: 2,
    borderColor: colors.silver,
    borderRadius: 20,
  },
  dustyCherryDark: {
    backgroundColor: colors.dustyCherry_Dark,
  },
  deliciousGreen: {
    backgroundColor: colors.deliciousGreen,
  },
  small: {
    width: 100,
    height: 50,
  },
  big: {
    width: 150,
    height: 70,
  },
  text: {
    color: colors.silver,
    textAlign: "center",
  },
});
