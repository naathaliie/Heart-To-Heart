import { fetchCategories } from "@/API/api";
import { updateCurrentCategory } from "@/redux/currentCategory";
import { AppDispatch, RootState } from "@/redux/store";
import { Category } from "@/types";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";
import PrimaryBtn from "@/components/primaryBtn";
import fonts from "../../styles/fonts.js";
import colors from "../../styles/colors.js";

export default function HomeScreen() {
  //dispatch=en funktion för att skicka actions till redux store
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  //Spara vald nivås kategorier
  const [filteredCategories, setFilteredCategories] = useState<
    Category[] | undefined
  >(undefined);
  //spara vald categori
  const [coosedCategory, setChoosedCategory] = useState<Category | undefined>(
    undefined
  );

  //Hämta från redux
  const currentLevel = useSelector((state: RootState) => state.currentLevel);
  const { categories, loading, error } = useSelector(
    (state: RootState) => state.categories
  );

  function handleOnPress(oneCategory: Category) {
    dispatch(updateCurrentCategory(oneCategory));
    router.push("/questionScreen");
  }

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
      <View style={styles.textBox}>
        <Text style={{ fontSize: fonts.fontSizes.large }}>Välj kategori</Text>
        <Text style={{ fontSize: fonts.fontSizes.small, textAlign: "center" }}>
          Nivå: {currentLevel.currentLevel?.level}
        </Text>
      </View>

      <View style={styles.categoriesBox}>
        {filteredCategories?.map((c) => {
          return (
            <PrimaryBtn
              key={c._id}
              title={c.title}
              color="dustyCherryDark"
              size="big"
              onPress={() => handleOnPress(c)}
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
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  textBox: { alignItems: "center" },
  categoriesBox: {},
  btn: {
    backgroundColor: "#08AEAD",
    borderWidth: 1,
    borderColor: "#ffffff",
    borderRadius: 20,
    padding: 10,
  },
});
