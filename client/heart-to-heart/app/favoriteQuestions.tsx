import { StyleSheet, Text, View } from "react-native";
import colors from "../styles/colors.js";
import fonts from "../styles/fonts.js";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store.js";
import { useEffect, useState } from "react";
import { fetchAllFavoritQuestions } from "@/API/api.ts";

export default function FavoriteQuestions() {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector((state: RootState) => state.currentUser);

  //Hämtar favoritQuestions från redux userstate?
  const { users } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    //ladda in alla favoritfrågor från backend
    if (currentUser.currentUser) {
      dispatch(fetchAllFavoritQuestions(currentUser.currentUser?._id));
    }
  }, [dispatch]); //Lyssna på förändringar om allafavoritfrågor ändras

  const thisUsersFavoriteQuestions =
    users.find((user) => user._id === currentUser.currentUser?._id)
      ?.likedQuestions || [];

  return (
    <View style={styles.container}>
      <View style={styles.textBox}>
        <Text style={styles.text}>Dina favvofrågor</Text>
      </View>
      <View>
        {thisUsersFavoriteQuestions.length > 0 ? (
          thisUsersFavoriteQuestions.map((q) => {
            return (
              <View key={q._id}>
                <Text>{q.questionText}</Text>
              </View>
            );
          })
        ) : (
          <Text> Du har inte gillamarkerat några frågor ännu</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.myBackground,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textBox: {
    marginBottom: 20,
  },
  text: {
    fontSize: fonts.fontSizes.medium,
    textAlign: "center",
  },
});
