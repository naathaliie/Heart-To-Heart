import { View, Text, Pressable, StyleSheet } from "react-native";
import colors from "../styles/colors.js";

type PrimaryBtnProps = {
  key?: string;
  title: string;
  onPress: () => void;
  color: "dustyCherryDark" | "deliciousGreen";
  size: "small" | "big";
};

export default function PrimaryBtn({
  key,
  title,
  onPress,
  color,
  size,
}: PrimaryBtnProps) {
  //Stil baserat på props
  const btnStyle = [styles.btnBase, styles[color], styles[size]];

  return (
    <Pressable
      key={key}
      onPress={() => {
        onPress();
      }}
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
