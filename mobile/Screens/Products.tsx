import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { firebase } from "../config";
import Card from "../components/Card";
import Header from "../components/Header";
import { IMG } from "../utils/Images";
import { useNavigation } from "@react-navigation/native";

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigation: any = useNavigation();
  const fetchProducts = async () => {
    try {
      const snapshot = await firebase.firestore().collection("products").get();
      const Data: any = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(Data);
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
      }}
    >
      <Header
        sizeLeft={20}
        sizeRight={35}
        iconLeft={IMG.back}
        iconRight={IMG.bag}
        onpressLeft={() => navigation.goBack()}
      />
      <FlatList
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        contentContainerStyle={styles.contentContainer}
        data={products}
        renderItem={({ item, index }) => {
          return <Card key={index} product={item} />;
        }}
      />
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 25,
    marginHorizontal: "auto",

    justifyContent: "space-evenly",
    gap: 5,
  },
});
