import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="homeScreen"
        options={{
          headerTitle: "Hjärta till Hjärta",
          headerTitleAlign: "center",
        }}
      />
      <Tabs.Screen
        name="myPage"
        options={{
          headerTitle: "Min sida",
        }}
      />
    </Tabs>
  );
}
