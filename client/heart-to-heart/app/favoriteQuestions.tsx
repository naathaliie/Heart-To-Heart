import { ScrollView, StyleSheet, Text, View } from "react-native";
import colors from "../styles/colors.js";
import fonts from "../styles/fonts.js";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store.js";
import { useEffect, useState } from "react";
import { fetchAllFavoritQuestions } from "@/API/api.ts";

export default function FavoriteQuestions() {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector((state: RootState) => state.currentUser);
  const { users } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    if (currentUser.currentUser) {
      dispatch(fetchAllFavoritQuestions(currentUser.currentUser?._id));
    }
  }, [dispatch]); //Lyssna på förändringar om allafavoritfrågor ändras

  const thisUsersFavoriteQuestions =
    users.find((user) => user._id === currentUser.currentUser?._id)
      ?.likedQuestions || [];

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          alignContent: "center",
          paddingBottom: 80, // Extra utrymme längst ner för att visa sista frågan
          paddingTop: 10,
        }}
      >
        <View style={styles.favQuestionBox}>
          {thisUsersFavoriteQuestions.length > 0 ? (
            thisUsersFavoriteQuestions.map((q) => {
              return (
                <View key={q._id} style={styles.favQuestion}>
                  <Text style={styles.questionText}>{q.questionText}</Text>
                  <Text style={styles.categoryText}>
                    {" "}
                    Kategori: {q.categoryType}
                  </Text>
                </View>
              );
            })
          ) : (
            <Text> Du har inte gillamarkerat några frågor ännu</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingBottom: 20,
    paddingTop: 20,
    backgroundColor: colors.myBackground,
  },
  textBox: {
    justifyContent: "center",
    marginBottom: 20,
  },
  text: {
    fontSize: fonts.fontSizes.medium,
    textAlign: "center",
  },
  favQuestionBox: {
    padding: 10,
  },
  favQuestion: {
    backgroundColor: colors.dustyCherry_Dark,
    margin: 7,
    padding: 15,
    borderRadius: 20,
    gap: 5,
  },
  questionText: {
    fontSize: fonts.fontSizes.medium,
    color: colors.silver,
  },
  categoryText: {
    color: colors.silver,
    fontSize: fonts.fontSizes.small,
    fontStyle: "italic",
  },
});
