import { AppDispatch, RootState } from "@/redux/store";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { fetchLevels } from "@/API/api";
import { updateCurrentLevel } from "@/redux/currentLevel";
import { Level } from "@/types";

export default function LevelsScreen() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  //Spara klickad nivå
  const [choosedLevel, setChoosedLevel] = useState<Level | null>(null);

  //Hämta inloggad user
  const currentUser = useSelector((state: RootState) => state.currentUser);

  // Hämta alla levels när komponenten renderas första gången
  useEffect(() => {
    dispatch(fetchLevels());
  }, [dispatch]);

  // Hämta levels från Redux
  const { levels, loading, error } = useSelector(
    (state: RootState) => state.levels
  );

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text>categoryscreen</Text>

      <View>
        <Text>Här ska alla nivåer synas</Text>
      </View>

      <View>
        {levels.map((level) => {
          return (
            <Pressable
              key={level._id}
              onPress={() => {
                setChoosedLevel(level);
              }}
              style={styles.btnPlum}
            >
              <Text>{level.level}</Text>
            </Pressable>
          );
        })}
      </View>
      <View>
        <Text>Du kommer att välja nivå: {choosedLevel?.level}</Text>
      </View>

      <View>
        <Pressable
          style={styles.btn}
          onPress={() => {
            // Dispatcha action för att uppdatera currentUser i Redux
            if (choosedLevel) {
              dispatch(updateCurrentLevel(choosedLevel)); // Uppdaterar Redux store med den valda nivån
            }

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
  btnPlum: {
    backgroundColor: "plum",
    borderWidth: 1,
    borderColor: "#ffffff",
    borderRadius: 20,
    padding: 10,
  },
});
