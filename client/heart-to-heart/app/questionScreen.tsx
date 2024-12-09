import { StyleSheet, Text, View } from "react-native";

export default function QuestionScreen() {
  return (
    <View style={styles.container}>
      <Text>questionView</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
