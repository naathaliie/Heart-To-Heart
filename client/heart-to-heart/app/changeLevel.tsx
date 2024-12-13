import { AppDispatch, RootState } from "@/redux/store";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { fetchLevels } from "@/API/api";
import { updateCurrentLevel } from "@/redux/currentLevel";
import PrimaryBtn from "@/components/primaryBtn";
import colors from "../styles/colors.js";
import { Level } from "@/types.ts";
import fonts from "@/styles/fonts.js";

export default function LevelsScreen() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  // Hämta alla levels när komponenten renderas första gången
  useEffect(() => {
    dispatch(fetchLevels());
  }, [dispatch]);

  //Hämta från Redux
  const currentlevel = useSelector((state: RootState) => state.currentLevel);
  const { levels, loading, error } = useSelector(
    (state: RootState) => state.levels
  );

  function handleChangeLevel(level: Level) {
    dispatch(updateCurrentLevel(level));
    router.push("/(tabs)/homeScreen");
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
        <Text style={{ fontSize: fonts.fontSizes.medium, marginBottom: 40 }}>
          Nuvarande nivå: {currentlevel.currentLevel?.level}
        </Text>
      </View>
      <View>
        {levels.map((level) => {
          return (
            <PrimaryBtn
              key={level._id}
              title={level.level}
              onPress={() => handleChangeLevel(level)}
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
  btnPlum: {
    backgroundColor: "plum",
    borderWidth: 1,
    borderColor: "#ffffff",
    borderRadius: 20,
    padding: 10,
  },
});
