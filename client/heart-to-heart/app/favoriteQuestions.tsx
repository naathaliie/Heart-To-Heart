import { StyleSheet, Text, View } from "react-native";
import colors from "../styles/colors.js";
import fonts from "../styles/fonts.js";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store.js";
import { useEffect } from "react";

export default function FavoriteQuestions() {
  //komma åt currentUser och all denns info
  const currentUser = useSelector((state: RootState) => state.currentUser);

  //För att uppdatera om en ny fråga blir gillamarkerad/borttagen
  useEffect(() => {
    if (currentUser.currentUser) {
      console.log(
        "Uppdaterade gillade frågor:",
        currentUser.currentUser.likedQuestions
      );
    }
  }, [currentUser.currentUser?.likedQuestions]);

  return (
    <View style={styles.container}>
      <View style={styles.textBox}>
        <Text style={styles.text}>
          Här kommer alla dina favorit-markerade frågor att synas
        </Text>
      </View>
      <View>
        {currentUser.currentUser &&
          currentUser.currentUser.likedQuestions.map((q) => {
            return (
              <View key={q._id}>
                <Text>{q.questionText}</Text>
              </View>
            );
          })}
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
