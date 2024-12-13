import { fetchQuestions } from "@/API/api";
import QuestionCard from "@/components/questionCard";
import { AppDispatch, RootState } from "@/redux/store";
import { Question } from "@/types";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Swiper from "react-native-swiper";
import colors from "../styles/colors.js";
import fonts from "../styles/fonts.js";

export default function QuestionScreen() {
  //dispatchen funktion för att skicka actions till redux store
  const dispatch = useDispatch<AppDispatch>();

  //Hämta alla frågor för vald kategori
  const [relevantQuestions, setrelevantQuestions] = useState<
    Question[] | undefined
  >(undefined);

  const currentCategory = useSelector(
    (state: RootState) => state.currentCategory
  );

  const { questions, loading, error } = useSelector(
    (state: RootState) => state.questions
  );

  // Hämta frågor från backend: När komponenten laddas, kolla om frågorna finns i Redux-state.
  //Om inte, hämta dem med fetchQuestions.
  useEffect(() => {
    // Hämta frågor om de inte redan finns
    if (questions.length === 0) {
      dispatch(fetchQuestions());
    }
  }, [dispatch, questions.length]);

  //En till useEffect som lyssnar på om questions eller currrentCategory ändras
  useEffect(() => {
    const relevantQuestions = questions.filter((q) => {
      return q.categoryType === currentCategory.currentCategory?.title;
    });
    setrelevantQuestions(relevantQuestions);
  }, [questions, currentCategory]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  const test = relevantQuestions?.map((q) => {
    return q.questionText;
  });

  if (relevantQuestions?.length !== undefined) {
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            {currentCategory.currentCategory?.title}
          </Text>
        </View>

        <Swiper
          key={relevantQuestions.length}
          style={styles.wrapper}
          showsButtons={true}
          nextButton={
            <Text style={{ color: colors.dustyCherry_Dark, fontSize: 50 }}>
              ›
            </Text>
          }
          prevButton={
            <Text style={{ color: colors.dustyCherry_Dark, fontSize: 50 }}>
              ‹
            </Text>
          }
          dotColor={colors.dustyCherry} // Färg för inaktiva pluppar
          activeDotColor={colors.dustyCherry_superDark} // Färg för aktiva pluppar
        >
          {relevantQuestions.map((question, index) => (
            <QuestionCard key={index} oneQuestion={question} />
          ))}
        </Swiper>
      </View>
    );
  } else {
    return (
      <View>
        <Text>Laddar...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.myBackground,

    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  textContainer: {
    marginTop: 40,
  },
  wrapper: {},
  text: {
    fontSize: fonts.fontSizes.medium,
    color: colors.myBlack,
  },
});
