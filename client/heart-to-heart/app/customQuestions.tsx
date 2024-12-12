import { StyleSheet, Text, TextInput, View } from "react-native";
import colors from "../styles/colors.js";
import fonts from "../styles/fonts.js";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store.js";
import { useEffect, useState } from "react";
import { addNewCustomQuestion, fetchCreatedQuestions } from "@/API/api.ts";
import PrimaryBtn from "../components/primaryBtn.tsx";
import { NewQuestion } from "@/types.ts";

export default function CustomQuestions() {
  const [inputQuestion, setInputQuestion] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  //hämta currentUser
  const currentUser = useSelector((state: RootState) => state.currentUser);
  //Hämta users från redux
  const { users } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    if (currentUser.currentUser) {
      dispatch(fetchCreatedQuestions(currentUser.currentUser._id));
    }
  }, [dispatch]);

  function addNewQuestion() {
    console.log("Lägg till frågaaaa");

    if (currentUser.currentUser) {
      console.log("currentuser finns?");

      const newQuestion: NewQuestion = {
        questionText: inputQuestion,
        categoryType: "customQuestion",
      };

      dispatch(
        addNewCustomQuestion({
          userId: currentUser.currentUser?._id,
          newCustomQuestion: newQuestion,
        })
      );
    } else {
      console.log("currentuser finns inte");
    }
  }

  const thisUsersCreatedQuestions =
    users.find((user) => user._id === currentUser.currentUser?._id)
      ?.createdQuestions || [];

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>
          Här kommer du att kunna lägga till egna frågor
        </Text>
      </View>

      <View>
        <TextInput
          onChangeText={(text) => setInputQuestion(text)}
          value={inputQuestion}
          placeholder="Skriv din fråga här"
          style={styles.inputField}
        />

        {/* LÄGGA TILL EN KNAPP OCH NÄR MAN KLICKAR PÅ DEN SKALL ORDET SPARAS OCH SEDAN BLI TILL EN NY FRÅGA SOM SKALL SPARAS I DB */}
        <PrimaryBtn
          title="Lägg till"
          onPress={() => addNewQuestion()}
          color="deliciousGreen"
          size="big"
        />
      </View>

      <View>
        {thisUsersCreatedQuestions.length > 0 ? (
          thisUsersCreatedQuestions.map((q) => {
            return (
              <View key={q._id}>
                <Text>{q.questionText}</Text>
              </View>
            );
          })
        ) : (
          <Text>Du har inte skapat några egna frågor ännu</Text>
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
  text: {
    fontSize: fonts.fontSizes.medium,
    textAlign: "center",
  },
  inputField: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
