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
  const testQuestions = [
    { _id: "1", questionText: "Testfråga 1" },
    { _id: "2", questionText: "Testfråga 2" },
    { _id: "3", questionText: "Testfråga 3" },
  ];

  //dispatch=en funktion för att skicka actions till redux store
  const dispatch = useDispatch<AppDispatch>();

  //Tillhandahålla all frågor för vald kategori
  const [relevantQuestions, setrelevantQuestions] = useState<
    Question[] | undefined
  >(undefined);
  //vald kategori
  const currentCategory = useSelector(
    (state: RootState) => state.currentCategory
  );

  // Hämta frågor från Redux
  const { questions, loading, error } = useSelector(
    (state: RootState) => state.questions
  );

  // Hämta frågor från backend: När komponenten laddas, kolla om frågorna finns i Redux-state.
  //Om inte, hämta dem med fetchQuestions.
  useEffect(() => {
    console.log("questions längd i useeffect är: ", questions.length);

    // Hämta frågor om de inte redan finns
    if (questions.length === 0) {
      dispatch(fetchQuestions()); // Vänta på att frågorna ska hämtas
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
  console.log("antal frågor= ", relevantQuestions?.length);
  console.log("Fråge titlar= ", test);

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
          dotColor={colors.dustyCherry_Dark} // Färg för inaktiva pluppar
          activeDotColor={colors.deliciousGreen} // Färg för aktiva pluppar
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
