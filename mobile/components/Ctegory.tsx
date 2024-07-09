import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback } from "react";
import { CATEGORIES } from "../utils/categories";
import { COLORS } from "../utils/colors";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";

const { width, height } = Dimensions.get("screen");

const Ctegory = ({ txt, img }: { txt: string; img: undefined }) => {
  const navigation: any = useNavigation();

  // const [fontsLoaded] = useFonts({
  //   "AlexBrush-Regular": require("../assets/fonts/AlexBrush-Regular.ttf"),
  // });

  const [fontsLoaded, fontError] = useFonts({
    "AlexBrush-Regular": require("../assets/fonts/AlexBrush-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("products")}
    >
      <Text style={styles.txt}>{txt}</Text>
      <Image source={img} style={styles.img} />
    </TouchableOpacity>
  );
};

export default Ctegory;

const styles = StyleSheet.create({
  container: {
    width: width - 40,
    height: 120,
    borderRadius: 20,
    backgroundColor: COLORS.black,
    shadowColor: "black",
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 2,
    justifyContent: "center",
  },
  txt: {
    textAlign: "center",
    textTransform: "capitalize",
    marginRight: 100,
    fontSize: 30,
    color: COLORS.pink,
    fontFamily: "AlexBrush-Regular",
  },
  img: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 150,
    height: 150,
  },
});
