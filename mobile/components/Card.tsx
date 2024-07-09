import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { IMG } from "../utils/Images";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../utils/colors";
import { useNavigation } from "@react-navigation/native";

const Card = ({ product }: { product: any }) => {
  const navigation: any = useNavigation();
  return (
    <View style={styles.container}>
      <ImageBackground source={IMG.card} style={styles.card}>
        <TouchableOpacity
          style={styles.imgContiner}
          onPress={() => {
            navigation.navigate("details", product);
          }}
        >
          <Image
            style={styles.img}
            source={{
              uri: product.imgs[0],
            }}
          />
        </TouchableOpacity>
        <View style={styles.txtContainer}>
          <Text style={styles.txt}>
            {product.name.length > 25
              ? product.name.slice(0, 25) + "..."
              : product.name}
          </Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.price}>{product.price} EGP</Text>
        </View>

        <TouchableOpacity style={styles.btn}>
          <AntDesign name="hearto" size={24} color={COLORS.black} />
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 225,
    margin: 10,
  },
  card: {
    width: 150,
    height: 200,
  },
  imgContiner: {
    width: "80%",
    aspectRatio: 0.9,
    position: "absolute",
    top: -25,
    alignSelf: "center",
    borderRadius: 5,
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },

  btn: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    borderColor: COLORS.black,
    borderWidth: 2,
    position: "absolute",
    bottom: 0,
    right: 0,
    shadowColor: "black",
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 0,
  },
  info: {
    position: "absolute",
    bottom: 15,
    left: 10,
    gap: 2,
  },
  txtContainer: {
    position: "absolute",
    bottom: 45,
    left: 10,
    width: "90%",
    height: 40,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  txt: {
    fontSize: 13,
    fontWeight: "700",
    color: "lightgrey",
    lineHeight: 18,
  },
  price: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: "bold",
  },
});
