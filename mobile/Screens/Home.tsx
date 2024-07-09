import * as React from "react";
import {
  StatusBar,
  Image,
  Animated,
  View,
  Dimensions,
  StyleSheet,
} from "react-native";
import { CATEGORIES } from "../utils/categories";
import Ctegory from "../components/Ctegory";
import Header from "../components/Header";
import { IMG } from "../utils/Images";

const { width, height } = Dimensions.get("screen");

const SPACING = 20;
const Item_SIZE = 170;

const Home = () => {
  const scrollY = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* <Image
        source={{
          uri: "https://images.pexels.com/photos/14924001/pexels-photo-14924001.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        }}
        style={StyleSheet.absoluteFillObject}
        blurRadius={5}
      /> */}
      <Header
        sizeLeft={100}
        sizeRight={35}
        iconLeft={IMG.logo}
        iconRight={IMG.bag}
      />
      <Animated.FlatList
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        style={{ flex: 1 }}
        contentContainerStyle={[
          { paddingTop: StatusBar.currentHeight },
          styles.flatList,
        ]}
        showsVerticalScrollIndicator={false}
        data={CATEGORIES}
        renderItem={({ item, index }) => {
          const inputRange = [
            -1,
            0,
            Item_SIZE * index,
            Item_SIZE * (index + 3),
          ];
          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
          });
          return (
            <Animated.View
              style={[
                styles.cardContainer,
                {
                  transform: [{ scale }],
                },
              ]}
            >
              <Ctegory img={item.img} txt={item.title} />
            </Animated.View>
          );
        }}
      />
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  flatList: {
    paddingTop: 50,
    paddingBottom: 20,
    gap: 50,
  },
  cardContainer: {
    flex: 1,
    alignItems: "center",
  },
});
