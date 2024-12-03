import { Link, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  //Komma åt routern
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text>index</Text>
      <Link href={"/changeLevel"}>
        <Pressable
          onPress={() => {
            router.push("/(tabs)/homeScreen");
          }}
        >
          <Text>Starta appen</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
