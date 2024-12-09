import { Options } from "@/types";
import { Link, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

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
  return (
    <View style={styles.container}>
      <Text>MyPage</Text>

      <View>
        {options.map((option, index) => {
          return (
            <Link href={option.screen} key={index} style={styles.btn}>
              <Text>{option.title}</Text>
            </Link>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
