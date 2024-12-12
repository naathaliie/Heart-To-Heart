import { useRouter } from "expo-router";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import ShadowsIntoLight from "../assets/fonts/ShadowsIntoLight-Regular.ttf";
import CaveatBrushRegular from "../assets/fonts/CaveatBrush-Regular.ttf";
import { useEffect, useState } from "react";
import { Image } from "expo-image";

//Antalet sekunder innan man går vidare
const seconds = 3000;

export default function Index() {
  //Komma åt routern
  const router = useRouter();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [timeoutReached, setTimeoutReached] = useState(false); // Håller koll på om seconds sekunder har passerat

  //Effect för att ladda fonts
  useEffect(() => {
    SplashScreen.preventAutoHideAsync(); // Förhindrar att splash screen försvinner för tidigt

    // Funktion för att ladda fonter
    async function loadFonts() {
      try {
        await Font.loadAsync({
          ShadowsIntoLight: ShadowsIntoLight,
          CaveatBrushRegular: CaveatBrushRegular,
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setFontsLoaded(true); // Fonten har laddats
      }
    }

    loadFonts();

    // Timer för att säkerställa att splashscreen visas i minst seconds sekunder
    const timer = setTimeout(() => {
      setTimeoutReached(true); // Sätt timeoutReached till true efter seconds sekunder
    }, seconds); // 5 sekunder

    return () => clearTimeout(timer); // Rensa timern när komponenten unmountas
  }, []);

  useEffect(() => {
    // När både fonten är laddad och den minsta tiden har gått (seconds sek)
    if (fontsLoaded && timeoutReached) {
      SplashScreen.hideAsync(); // Dölj splash screen
      router.replace("/loginScreen"); // Navigera automatiskt till login screen
    }
  }, [fontsLoaded, timeoutReached, router]);

  // Det som visas medan fonten laddas och/eller innan det gått seconds sek
  return (
    <View style={styles.container}>
      <StatusBar barStyle={"dark-content"} backgroundColor={"#352D30"} />
      <Image
        source={require("../assets/images/welcomeImg.jpeg")}
        style={styles.imgStyle}
        contentFit="cover"
        allowDownscaling={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#25292c",
  },
  imgStyle: {
    flex: 1, // Täcker hela föräldraview
    width: "100%",
    height: "100%",
    position: "absolute", // Gör att bilden fyller hela skärme
    backgroundColor: "#0553",
  },
});
