import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { NewUser, User } from "@/types";
import { updateCurrentUser } from "@/redux/currentUserSlice";
import { addNewUser, fetchUsers } from "@/API/api";
import PrimaryBtn from "@/components/primaryBtn";
import colors from "@/styles/colors";
import fonts from "@/styles/fonts.js";

export default function loginScreen() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  // Hämta användare från Redux
  const { users, loading, error } = useSelector(
    (state: RootState) => state.users
  );

  //hantera input från inputfältet:
  const [inputWord, setInputword] = useState("");

  //Se vald profil man vill logga in med
  const [chossedProfile, setChossedProfile] = useState<User | undefined>(
    undefined
  );

  // Hämta användare när komponenten renderas första gången
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  //hantera gå till appen-knappen
  function handleGoToApp() {
    // Dispatcha action för att uppdatera currentUser i Redux
    if (chossedProfile) {
      dispatch(updateCurrentUser(chossedProfile)); // Uppdaterar Redux store med den valda användaren
    }
    router.replace("/levelsScreen");
  }

  // Hantera lägg till användare
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

    // Logga de uppdaterade användarna
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: 30,
      }}
    >
      <View style={styles.container}>
        <View style={styles.existingProfilesContainer}>
          <Text style={{ fontSize: fonts.fontSizes.medium }}>
            Välj en profil
          </Text>

          <View style={styles.existingProfilesBox}>
            {users.map((user) => {
              return (
                <PrimaryBtn
                  key={user._id + user.username}
                  title={user.username}
                  onPress={() => setChossedProfile(user)}
                  color="dustyCherryDark"
                  size="small"
                />
              );
            })}
          </View>
          <Text style={{ fontSize: fonts.fontSizes.small }}>
            Du kommer nu att logga in som: {chossedProfile?.username}
          </Text>
          <PrimaryBtn
            title="Gå till appen"
            onPress={() => handleGoToApp()}
            color="deliciousGreen"
            size="big"
          />
        </View>

        {/* KANSKE EN MODAL AV NEDAN? */}

        <Text style={{ margin: 20, fontWeight: "bold" }}>Eller</Text>

        <View style={styles.newProfileContainer}>
          <View>
            <Text>Skapa en ny användare</Text>
          </View>
          <View>
            <TextInput
              style={styles.inputField}
              onChangeText={(input) => setInputword(input)}
              value={inputWord}
              placeholder="Användarnamn: "
              keyboardType="default"
            />
            <Text>DU SKREV: {inputWord}</Text>
            <Pressable
              onPress={() => {
                handleAddUser();
              }}
              style={styles.btn}
            >
              <Text>Skapa ny användare</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
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
  },
});
