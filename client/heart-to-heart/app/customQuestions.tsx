import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import colors from "../styles/colors.js";
import fonts from "../styles/fonts.js";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store.js";
import { useEffect, useState } from "react";
import { addNewCustomQuestion, fetchCreatedQuestions } from "@/API/api.ts";
import PrimaryBtn from "../components/primaryBtn.tsx";
import { NewQuestion, Question } from "@/types.ts";

export default function CustomQuestions() {
  const [inputQuestion, setInputQuestion] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  //hämta från redux
  const currentUser = useSelector((state: RootState) => state.currentUser);
  const { users } = useSelector((state: RootState) => state.users);

  // Hanterar användarens skapade frågor
  const [thisUsersCreatedQuestions, setThisUsersCreatedQuestions] = useState<
    Question[]
  >(
    users.find((user) => user._id === currentUser.currentUser?._id)
      ?.createdQuestions || []
  );

  useEffect(() => {
    // När currentUser ändras, uppdatera användarens skapade frågor
    if (currentUser.currentUser) {
      setThisUsersCreatedQuestions(
        users.find((user) => user._id === currentUser.currentUser?._id)
          ?.createdQuestions || []
      );
    }
  }, [currentUser, users]);

  function addNewQuestion() {
    if (currentUser.currentUser) {
      const newQuestion: NewQuestion = {
        questionText: inputQuestion,
        categoryType: "customQuestion",
      };

      Keyboard.dismiss();

      dispatch(
        addNewCustomQuestion({
          userId: currentUser.currentUser?._id,
          newCustomQuestion: newQuestion,
        })
      )
        // När frågan har skapats, hämta de uppdaterade skapade frågorna
        .then(() => {
          if (currentUser.currentUser) {
            dispatch(fetchCreatedQuestions(currentUser.currentUser?._id));

            setInputQuestion("");
          }
        })
        .catch((error) => {
          console.log("Error creating new question:", error);
        });
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.createNewQuestionBox}>
        <View>
          <Text style={styles.text}>Skapa en egen fråga </Text>
        </View>

        <TextInput
          onChangeText={(text) => setInputQuestion(text)}
          value={inputQuestion}
          placeholder="Skriv din fråga här"
          style={styles.inputField}
        />

        <PrimaryBtn
          title="Lägg till"
          onPress={() => addNewQuestion()}
          color="deliciousGreen"
          size="small"
        />
      </View>
      <ScrollView
        contentContainerStyle={{
          alignContent: "center",
          paddingBottom: 80, // Extra utrymme längst ner för att visa sista frågan
          paddingTop: 20,
        }}
      >
        <View style={styles.myCreatedQuestionBox}>
          {thisUsersCreatedQuestions.length > 0 ? (
            thisUsersCreatedQuestions.map((q) => {
              return (
                <View key={q._id} style={styles.customQuestion}>
                  <Text style={styles.questionText}>{q.questionText}</Text>
                </View>
              );
            })
          ) : (
            <Text>Du har inte skapat några egna frågor ännu</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.myBackground,
    flex: 1,
    alignItems: "center",
  },
  createNewQuestionBox: {
    marginVertical: 40,
    paddingBottom: 30,
    borderBottomWidth: 1,
    borderColor: colors.dustyCherry_Dark,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  myCreatedQuestionBox: {
    alignItems: "center",
  },
  text: {
    fontSize: fonts.fontSizes.medium,
    textAlign: "center",
  },
  inputField: {
    height: 40,
    width: "75%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  customQuestion: {
    backgroundColor: colors.dustyCherry_Dark,
    margin: 7,
    padding: 15,
    width: "85%",
    borderRadius: 20,
    gap: 5,
  },
  questionText: {
    fontSize: fonts.fontSizes.medium,
    color: colors.silver,
    textAlign: "center",
  },
});
