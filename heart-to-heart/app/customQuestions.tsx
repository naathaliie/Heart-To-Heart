import { StyleSheet, Text, View } from "react-native";

export default function CustomQuestions() {
  return (
    <View style={styles.container}>
      <Text>customQuestions</Text>
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
