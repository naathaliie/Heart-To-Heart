import { AppDispatch, RootState } from "@/redux/store";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { fetchLevels } from "@/API/api";
import { updateCurrentLevel } from "@/redux/currentLevel";
import { Level } from "@/types";
import PrimaryBtn from "@/components/primaryBtn";
import fonts from "../styles/fonts.js";

export default function LevelsScreen() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  //Spara klickad nivå
  const [choosedLevel, setChoosedLevel] = useState<Level | null>(null);

  //Hämta från redux
  const currentUser = useSelector((state: RootState) => state.currentUser);
  const { levels, loading, error } = useSelector(
    (state: RootState) => state.levels
  );

  // Hämta alla levels när komponenten renderas första gången
  useEffect(() => {
    dispatch(fetchLevels());
  }, [dispatch]);

  function handleGoToNext() {
    // Dispatcha action för att uppdatera currentUser i Redux
    if (choosedLevel) {
      dispatch(updateCurrentLevel(choosedLevel));
    }

    router.replace("/(tabs)/homeScreen");
  }

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={{ fontSize: fonts.fontSizes.medium }}>
          Välj nivå på frågorna
        </Text>
      </View>

      <View>
        {levels.map((level) => {
          return (
            <PrimaryBtn
              key={level._id}
              title={level.level}
              onPress={() => setChoosedLevel(level)}
              color="dustyCherryDark"
              size="big"
            />
          );
        })}
      </View>
      <View>
        <Text>Du kommer att välja nivå: {choosedLevel?.level}</Text>
      </View>

      <View>
        <PrimaryBtn
          title="Till appen"
          onPress={() => handleGoToNext()}
          color="deliciousGreen"
          size="big"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
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
