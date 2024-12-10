import { StyleSheet, Text, View } from "react-native";
import colors from "../styles/colors.js";
import fonts from "../styles/fonts.js";

export default function CustomQuestions() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Här kommer du att kunna lägga till egna frågor
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
