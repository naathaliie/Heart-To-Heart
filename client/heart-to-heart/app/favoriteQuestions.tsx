import { StyleSheet, Text, View } from "react-native";
import colors from "../styles/colors.js";
import fonts from "../styles/fonts.js";

export default function FavoriteQuestions() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Här kommer alla dina favorit-markerade frågor att synas
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.myBackground,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: fonts.fontSizes.medium,
    textAlign: "center",
  },
});
