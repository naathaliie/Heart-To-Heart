import { StyleSheet, Text, View } from "react-native";

export default function ChangeLevel() {
  return (
    <View style={styles.container}>
      <Text>ChangeLevel</Text>
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
