import PrimaryBtn from "@/components/primaryBtn";
import { Options } from "@/types";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import colors from "../../styles/colors.js";

export default function MyPage() {
  const router = useRouter();
  //användarens val på mina sidor
  const options: Options[] = [
    {
      title: "Ändra nivå",
      screen: "/changeLevel",
    },
    {
      title: "Mina favoritfrågor",
      screen: "/favoriteQuestions",
    },
    { title: "Egna frågor", screen: "/customQuestions" },
  ];

  //hanter när man klickar på ett val
  function handlePress(thisOptionsScreen: String) {
    router.push(thisOptionsScreen);
  }

  return (
    <View style={styles.container}>
      <View>
        {options.map((option, index) => {
          return (
            <PrimaryBtn
              key={index}
              title={option.title}
              onPress={() => handlePress(option.screen)}
              color="dustyCherryDark"
              size="big"
            />
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
  btn: {
    backgroundColor: "#08AEAD",
    borderWidth: 1,
    borderColor: "#ffffff",
    borderRadius: 20,
    padding: 10,
  },
});
