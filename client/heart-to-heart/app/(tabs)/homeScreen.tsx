import { RootState } from "@/redux/store";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function HomeScreen() {
  //Hämta inloggad user
  const currentUser = useSelector((state: RootState) => state.currentUser);

  return (
    <View style={styles.container}>
      <Text>
        Homescreen och du loggade in som: {currentUser.currentUser?.username}
      </Text>

      <View>
        <Text>Här ska alla kategorier synas</Text>
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
});
