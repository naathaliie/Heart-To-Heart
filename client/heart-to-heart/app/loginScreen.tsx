import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { NewUser, User } from "@/types";
import { updateCurrentUser } from "@/redux/currentUserSlice";
import { addNewUser, fetchUsers } from "@/API/api";
import PrimaryBtn from "@/components/primaryBtn";
import fonts from "@/styles/fonts.js";
import { Modal, Portal, Button, PaperProvider } from "react-native-paper";

export default function loginScreen() {
  /***MODAL-STUFF***/
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  /***MODAL-STUFF***/

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  // Hämta användare från Redux
  const { users, loading, error } = useSelector(
    (state: RootState) => state.users
  );

  const [inputWord, setInputword] = useState("");

  const [chosedProfile, setChosedProfile] = useState<User | undefined>(
    undefined
  );

  // Hämta användare när komponenten renderas första gången
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  function handleGoToApp() {
    if (chosedProfile) {
      dispatch(updateCurrentUser(chosedProfile));
    }
    router.replace("/levelsScreen");
  }

  const handleAddUser = async () => {
    console.log("du klickade på handleAddUser för att lägga till :", inputWord);

    const thisNewUser: NewUser = {
      username: inputWord,
      likedQuestions: [],
      createdQuestions: [],
    };

    // Vänta på att den nya användaren ska läggas till först
    await dispatch(addNewUser(thisNewUser));

    // När användaren är tillagd, hämta den uppdaterade listan
    await dispatch(fetchUsers());

    hideModal();
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <PaperProvider>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 30,
        }}
      >
        <View style={styles.container}>
          <View style={styles.existingProfilesContainer}>
            <Text
              style={{
                fontSize: fonts.fontSizes.medium,
                textAlign: "center",
                marginBottom: 20,
              }}
            >
              Välj en användare och logga in
            </Text>

            <View style={styles.existingProfilesBox}>
              {users.map((user) => {
                return (
                  <PrimaryBtn
                    key={user._id + user.username}
                    title={user.username}
                    onPress={() => setChosedProfile(user)}
                    color="dustyCherryDark"
                    size="small"
                  />
                );
              })}
            </View>
            <PrimaryBtn
              title={
                chosedProfile?.username
                  ? `Logga in som ${chosedProfile?.username}`
                  : "Välj profil"
              }
              onPress={() => handleGoToApp()}
              color="deliciousGreen"
              size="big"
            />
          </View>

          {/* KANSKE EN MODAL AV NEDAN? */}

          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={styles.modalStyle}
            >
              <View style={{ alignItems: "center" }}>
                <TextInput
                  style={styles.inputField}
                  onChangeText={(input) => setInputword(input)}
                  value={inputWord}
                  placeholder="Nytt användarnamn "
                  keyboardType="default"
                />
                <PrimaryBtn
                  title="Skapa ny användare"
                  onPress={() => handleAddUser()}
                  color="deliciousGreen"
                  size="big"
                />
              </View>
            </Modal>
          </Portal>
          <Button style={{ marginTop: 30 }} onPress={showModal}>
            Skapa en ny användare
          </Button>
        </View>
      </ScrollView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  existingProfilesContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 2,
    width: "80%",
    padding: 20,
  },
  existingProfilesBox: {
    marginBottom: 30,
  },
  profileBtn: {
    backgroundColor: "#08AEAD",
    borderWidth: 1,
    borderColor: "#ffffff",
    borderRadius: 20,
    padding: 10,
  },
  btn: {
    backgroundColor: "#08AEAD",
    borderWidth: 1,
    borderColor: "#ffffff",
    borderRadius: 20,
    padding: 10,
  },
  btnText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  newProfileContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    width: "80%",
    padding: 20,
    gap: 15,
  },
  inputField: {
    borderWidth: 2,
    width: "60%",
    alignSelf: "center",
    marginBottom: 20,
  },
  modalStyle: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10, // Gör hörnen rundade
    width: Dimensions.get("window").width * 0.8, // Gör den 80% av skärmens bredd
    height: Dimensions.get("window").height * 0.7,
    maxWidth: 600, // Maxbredd för större skärmar
    alignSelf: "center", // Centrerar modalen horisontellt
  },
});
