import { fetchCategories } from "@/API/api";
import { updateCurrentCategory } from "@/redux/currentCategory";
import { AppDispatch, RootState } from "@/redux/store";
import { Category } from "@/types";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();
  //Spara vald nivås kategorier
  const [filteredCategories, setFilteredCategories] = useState<
    Category[] | undefined
  >(undefined);
  //spara vald categori
  const [coosedCategory, setChoosedCategory] = useState<Category | undefined>(
    undefined
  );
  //dispatch=en funktion för att skicka actions till redux store
  const dispatch = useDispatch<AppDispatch>();
  //Hämta inloggad user
  const currentUser = useSelector((state: RootState) => state.currentUser);
  //Hämta vald nivå
  const currentLevel = useSelector((state: RootState) => state.currentLevel);

  // Hämta kategorier från Redux
  const { categories, loading, error } = useSelector(
    (state: RootState) => state.categories
  );

  // Hämta alla kategorier när komponenten renderas första gången
  useEffect(() => {
    // Hämtar alla kategorier om de inte redan är hämtade
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }

    //Om vi har fått några kategorier och att currentlevel har en vald level
    if (categories.length > 0 && currentLevel.currentLevel) {
      const currentCategories = categories.filter((c) => {
        return currentLevel.currentLevel?.level === c.levelType;
      });
      setFilteredCategories(currentCategories);
    }
  }, [dispatch, categories, currentLevel.currentLevel?.level]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text>
        Homescreen och du loggade in som: {currentUser.currentUser?.username}{" "}
        med vald nivå: {currentLevel.currentLevel?.level}
      </Text>

      <View>
        <Text>Här ska alla kategorier synas</Text>
        {filteredCategories?.map((c) => {
          return (
            <Pressable
              key={c._id}
              onPress={() => {
                dispatch(updateCurrentCategory(c));
                //navigera till questionScreen
                console.log("vald kategori= ", c.title);
                router.push("/questionScreen");
              }}
              style={styles.btn}
            >
              <Text>{c.title}</Text>
            </Pressable>
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
