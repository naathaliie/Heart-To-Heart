import { Question } from "@/types";
import { View, Text, StyleSheet, Pressable } from "react-native";
import colors from "../styles/colors.js";
import fonts from "../styles/fonts.js";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store.js";
import { addLikedQuestion, deleteLikedQuestion } from "../API/api.ts";

type QuestionCardProps = {
  oneQuestion: Question;
};

export default function QuestionCard({ oneQuestion }: QuestionCardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector((state: RootState) => state.currentUser);

  const [like, setLike] = useState<boolean>(false);

  // Lyssna på förändringar i likedQuestions
  useEffect(() => {
    // Kolla om frågan finns i gillade frågor
    const isLiked = currentUser.currentUser?.likedQuestions.some(
      (item) => item._id === oneQuestion._id
    );

    setLike(isLiked || false); // Uppdatera like-statusen
  }, [currentUser.currentUser?.likedQuestions, oneQuestion._id]);

  const handleLike = () => {
    if (currentUser.currentUser) {
      if (like) {
        dispatch(
          deleteLikedQuestion({
            userId: currentUser.currentUser?._id,
            questionId: oneQuestion._id,
          })
        );
      } else {
        dispatch(
          addLikedQuestion({
            userId: currentUser.currentUser?._id,
            newFavoritQuestion: oneQuestion,
          })
        );
      }
      // Uppdatera like-state
      setLike(!like);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.likeBox}>
        <Pressable
          onPress={() => {
            handleLike();
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
