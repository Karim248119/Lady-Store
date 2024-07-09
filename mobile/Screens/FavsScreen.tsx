import { StyleSheet, Text, View } from "react-native";
import React from "react";

const FavsScreen = () => {
  return (
    <View style={styles.container}>
      <Text> Favourites</Text>
    </View>
  );
};

export default FavsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});
