import { fetchQuestions } from "@/API/api";
import QuestionCard from "@/components/questionCard";
import { AppDispatch, RootState } from "@/redux/store";
import { Question } from "@/types";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function QuestionScreen() {
  console.log("************************");
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

  useEffect(() => {
    console.log("först nu körs den andra useeffect");
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

  return (
    <View style={styles.container}>
      <Text>Här skall alla frågor synas</Text>

      <FlatList
        style={styles.flatlistStyle}
        horizontal
        data={relevantQuestions}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => <QuestionCard oneQuestion={item} />}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  flatlistStyle: {
    width: "80%",
  },
});
