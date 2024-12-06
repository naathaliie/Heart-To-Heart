import { RootState } from "@/redux/store";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";

export default function CategoryScreen() {
  const router = useRouter();
  //Hämta inloggad user
  const currentUser = useSelector((state: RootState) => state.currentUser);

  return (
    <View style={styles.container}>
      <Text>categoryscreen</Text>

      <View>
        <Text>Här ska alla kategorier synas</Text>
      </View>
      <View>
        <Pressable
          style={styles.btn}
          onPress={() => {
            router.replace("/(tabs)/homeScreen");
          }}
        >
          <Text>Välj kategori och gå viadre</Text>
        </Pressable>
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
