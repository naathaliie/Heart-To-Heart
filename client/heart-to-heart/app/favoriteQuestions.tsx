import { StyleSheet, Text, View } from "react-native";
import colors from "../styles/colors.js";
import fonts from "../styles/fonts.js";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store.js";

export default function FavoriteQuestions() {
  const dispatch = useDispatch<AppDispatch>();
  //komma åt currentUser och all denns info
  const currentUser = useSelector((state: RootState) => state.currentUser);

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
