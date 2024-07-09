import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useNavigation, useRoute } from "@react-navigation/native";

import React, { useRef, useState } from "react";

import {
  Image,
  FlatList,
  View,
  StatusBar,
  Dimensions,
  StyleSheet,
  Text,
  Animated,
  TouchableOpacity,
} from "react-native";
import Header from "../components/Header";
import { IMG } from "../utils/Images";
import { COLORS } from "../utils/colors";
import { AntDesign } from "@expo/vector-icons";

const { width, height } = Dimensions.get("screen");

const ITEM_WIDTH = width;
const ITEM_HEIGHT = height * 0.75;
const DOT_SIZE = 8;
const DOT_SPACING = 8;
const INDICATOR_SIZE = DOT_SIZE + DOT_SPACING;

// const product = {
//   title: "OFF-THE-SHOULDER DRESS WITH GATHERED DETAIL",
//   description:
//     "Short fitted off-the-shoulder dress made of a cotton blend. Featuring a straight neckline with turn-down detail and long sleeves.",
//   price: "29.99£",
//   colors: ["black", "brown", "#35374B", "#12372A"],
//   sizes: ["S", "M", "L"],
// };
type product = {
  name: string;
  description?: string;
  price?: string;
  category?: string;
  sales?: number;
  colors: [];
  sizes?: [];
  imgs?: [];
};
export function Content({ product }: { product: product }) {
  return (
    <View style={contentStyles.container}>
      <Text style={contentStyles.name}>{product.name}</Text>
      <Text style={contentStyles.price}>{product.price} EGP</Text>
      <View>
        <Text style={contentStyles.title}>description</Text>
        <Text style={contentStyles.description}>{product.description}</Text>
      </View>

      <View style={{ gap: 5 }}>
        <Text style={contentStyles.title}>Colors</Text>
        <View style={contentStyles.colorsContainer}>
          {product.colors.length ? (
            product.colors.map((color, index) => {
              return (
                <TouchableOpacity key={index} style={contentStyles.colors}>
                  <View
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 15,
                      backgroundColor: color,
                    }}
                  />
                </TouchableOpacity>
              );
            })
          ) : (
            <Text>Multi Colors</Text>
          )}
        </View>
      </View>
      <View style={{ gap: 6 }}>
        <Text style={contentStyles.title}>sizes</Text>
        <View style={contentStyles.colorsContainer}>
          {product.sizes &&
            product.sizes.map((size, index) => {
              return (
                <TouchableOpacity key={index} style={contentStyles.sizes}>
                  <Text style={{ color: COLORS.gray }}>{size}</Text>
                </TouchableOpacity>
              );
            })}
        </View>
      </View>
      <TouchableOpacity style={contentStyles.cartBtn}>
        <Text style={contentStyles.btnTxt}>ADD TO CART</Text>
        <AntDesign name="shoppingcart" size={24} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );
}

const contentStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 20,
    zIndex: 20,
  },
  name: {
    fontWeight: "bold",
    fontSize: 25,
  },
  title: {
    textTransform: "uppercase",
    marginBottom: 8,
    fontWeight: "700",
  },
  description: {
    fontSize: 12,
    lineHeight: 16,
    color: COLORS.gray,
  },
  price: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: "bold",
  },
  colorsContainer: {
    flexDirection: "row",
    gap: 20,
    flexWrap: "wrap",
  },
  colors: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS.gray,
  },
  sizes: {
    width: 90,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS.gray,
  },
  cartBtn: {
    width: 270,
    height: 50,
    borderRadius: 25,

    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
    flexDirection: "row",
    backgroundColor: COLORS.black,
    gap: 5,
  },
  btnTxt: {
    color: COLORS.white,
    fontSize: 20,
  },
});

export const ProductDetails = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const { params: item }: any = useRoute();
  const [Pressed, setPressed] = useState(false);
  const navigation: any = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden />
      <View style={{ height: ITEM_HEIGHT, overflow: "hidden" }}>
        <View style={{ position: "absolute", top: 0, zIndex: 10 }}>
          <Header
            sizeLeft={20}
            sizeRight={25}
            iconLeft={IMG.back}
            iconRight={Pressed ? IMG.heartFill : IMG.heart}
            onpressRight={() => setPressed(!Pressed)}
            onpressLeft={() => navigation.goBack()}
          />
        </View>
        <Animated.FlatList
          data={item.imgs}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate="fast"
          bounces={false}
          renderItem={({ item, index }) => {
            return (
              <View>
                <Image source={{ uri: item }} style={styles.img} />
              </View>
            );
          }}
        />
        <View style={styles.pagination}>
          {item.imgs.map((_: any, index: number) => {
            return <View key={index} style={styles.dot} />;
          })}
          <Animated.View
            style={[
              styles.dotIndecator,
              {
                transform: [
                  {
                    translateY: Animated.divide(
                      scrollY,
                      ITEM_HEIGHT
                    ).interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, INDICATOR_SIZE],
                    }),
                  },
                ],
              },
            ]}
          />
        </View>
      </View>
      <BottomSheet
        snapPoints={[height - ITEM_HEIGHT, height]}
        handleIndicatorStyle={{
          display: "flex",
        }}
        style={{ zIndex: 100 }}
      >
        <BottomSheetScrollView>
          <Content product={item} />
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    resizeMode: "cover",
  },
  pagination: {
    position: "absolute",
    top: ITEM_HEIGHT / 2,
    left: 20,
    gap: DOT_SPACING,
  },
  dot: {
    backgroundColor: "#333",
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE,
  },
  dotIndecator: {
    width: INDICATOR_SIZE,
    height: INDICATOR_SIZE,
    borderRadius: INDICATOR_SIZE,
    backgroundColor: "#333",
    opacity: 0.4,
    position: "absolute",
    top: -DOT_SIZE / 2,
    left: -DOT_SIZE / 2,
  },
});
