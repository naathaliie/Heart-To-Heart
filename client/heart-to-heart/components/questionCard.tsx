import { Question } from "@/types";
import { View, Text, StyleSheet, Pressable } from "react-native";
import colors from "../styles/colors.js";
import fonts from "../styles/fonts.js";
import { useState } from "react";

type QuestionCardProps = {
  oneQuestion: Question;
  liked: boolean;
};

export default function QuestionCard({
  oneQuestion,
  liked,
}: QuestionCardProps) {
  //Toggla favorit
  const [like, setLike] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <View style={styles.likeBox}>
        <Pressable
          onPress={() => {
            setLike(!like);
          }}
        >
          <Text>{like ? "❤️" : "🤍"}</Text>
        </Pressable>
      </View>

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
    right: "12%",
    width: "75%",
    height: "55%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.silver,
    backgroundColor: colors.dustyCherry_Dark,
    borderRadius: 20,
    padding: 20,
  },
  likeBox: {
    position: "absolute",
    top: 20,
    right: 10,
  },
  text: {
    textAlign: "center",
    color: colors.silver,
    fontSize: fonts.fontSizes.medium,
  },
  questionBox: {},
});
