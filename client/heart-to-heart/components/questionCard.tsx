import { Question } from "@/types";
import { View, Text, StyleSheet } from "react-native";

type QuestionCardProps = {
  oneQuestion: Question;
};

export default function QuestionCard({ oneQuestion }: QuestionCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.likeBox}></View>

      <View style={styles.questionBox}>
        <Text>{oneQuestion.questionText}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  likeBox: {},
  questionBox: {},
});
