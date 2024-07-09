import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS } from "../utils/colors";
import { IMG } from "../utils/Images";
import { Ionicons } from "@expo/vector-icons";
const Header = ({
  onpressLeft,
  onpressRight,
  iconLeft,
  iconRight,
  sizeRight,
  sizeLeft,
}: {
  onpressLeft?: () => void;
  onpressRight?: () => void;
  iconLeft?: any;
  iconRight?: any;
  sizeRight?: number;
  sizeLeft?: number;
}) => {
  const ICONSIZE = sizeRight;
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onpressLeft}>
        <Image
          source={iconLeft}
          style={{ width: sizeLeft, height: sizeLeft }}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={onpressRight}>
        <Image
          source={iconRight}
          style={{ width: sizeRight, height: sizeRight }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 100,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  icon: {
    width: 100,
    height: 100,
  },
  icon2: {
    width: 35,
    height: 35,
  },
  title: {
    width: 200,
    height: 80,
  },
});
