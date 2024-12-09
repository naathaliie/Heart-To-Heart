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
        <Text style={styles.text}>{oneQuestion.questionText}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "20%",
    right: "17%",
    width: "65%",
    height: "55%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    backgroundColor: "plum",
    borderRadius: 20,
    padding: 20,
  },
  text: {
    textAlign: "center",
  },
  likeBox: {},
  questionBox: {},
});
