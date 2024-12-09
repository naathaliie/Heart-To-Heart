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

  // Hämta alla levels när komponenten renderas första gången
  useEffect(() => {
    dispatch(fetchLevels());
  }, [dispatch]);

  //Hämta nuvarande nivå
  const currentlevel = useSelector((state: RootState) => state.currentLevel);

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
      <Text>Levlescreen</Text>

      <View>
        <Text>Nuvarande nivå är: {currentlevel.currentLevel?.level}</Text>
      </View>

      <View>
        {levels.map((level) => {
          return (
            <Pressable
              key={level._id}
              onPress={() => {
                dispatch(updateCurrentLevel(level)); // Uppdaterar Redux store med den valda nivån
              }}
              style={styles.btnPlum}
            >
              <Text>{level.level}</Text>
            </Pressable>
          );
        })}
      </View>
      <View>
        <Text>vald nivå {}</Text>
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
