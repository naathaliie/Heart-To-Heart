import { store } from "@/redux/store";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import colors from "../styles/colors.js";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.dustyCherry_Dark}
      />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.dustyCherry_Dark,
          },
          headerShadowVisible: false,
          headerTintColor: colors.silver,
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="loginScreen"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="levelsScreen"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="questionScreen"
          options={{
            headerTitle: "",
          }}
        />
        <Stack.Screen
          name="changeLevel"
          options={{
            headerTitle: "Ändra nivå",
          }}
        />
        <Stack.Screen
          name="favoriteQuestions"
          options={{
            headerTitle: "Mina favorit frågor",
          }}
        />
        <Stack.Screen
          name="customQuestions"
          options={{
            headerTitle: "Skapa egna frågor",
          }}
        />
        <Stack.Screen
          name="+not-found"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </Provider>
  );
}
