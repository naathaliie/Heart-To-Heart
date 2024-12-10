import { Tabs } from "expo-router";
import colors from "../../styles/colors.js";
import fonts from "../../styles/fonts.js";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.silver,
        tabBarInactiveTintColor: colors.dustyCherry_Dark,
        headerStyle: {
          backgroundColor: colors.dustyCherry,
        },
        headerShadowVisible: false,
        headerTintColor: colors.silver,
        headerTitleAlign: "center",
        tabBarStyle: {
          backgroundColor: colors.dustyCherry,
        },
      }}
    >
      <Tabs.Screen
        name="homeScreen"
        options={{
          headerTitle: "Hjärta till Hjärta",
          headerTitleStyle: { fontFamily: "Roboto" }, //FUNGEAR EJ:(
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              color={color}
              size={30}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="myPage"
        options={{
          headerTitle: "Mina sidor",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              color={color}
              size={30}
            />
          ),
        }}
      />
    </Tabs>
  );
}
