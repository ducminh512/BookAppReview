import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { useEffect, useState } from "react";
import { api } from "../../../core/api";
import { BASE_API_URL } from "../../share";

const { width } = Dimensions.get("window");

export const RecommendBooks = () => {
  const [recommendBooks, setRecommendBooks] = useState([]);

  useEffect(() => {
    api.getBooks(5, 20).then(({ data }) => { setRecommendBooks(data); })
  }, [])

  const _renderItem = ({ item, index }) => {
    return (
      <ImageBackground
        imageStyle={styles.bgImageStyle}
        style={styles.bgStyle}
        resizeMode="contain"
        source={{ uri: `${BASE_API_URL}/${item.cover_url}` }}
      >
        <Text style={styles.title}> {item?.title} </Text>
        <Text style={styles.author}> by {item?.author} </Text>
      </ImageBackground>
    );
  };


  return (<>
    <View style={{ height: 10 }} />
    <Text style={styles.recommendBookTitle} >
      Recommend Books
    </Text>

    <View style={{ height: 10 }} />

    <Carousel
      data={recommendBooks}
      renderItem={_renderItem}
      sliderWidth={width - 32}
      itemWidth={width - 32}
      loop
      autoplay
      autoplayDelay={3000}
      horizontal
    />

    <View style={{ height: 30 }} />
  </>)
}

const styles = StyleSheet.create({
  bgImageStyle: {
    borderRadius: 5,
    height: 200,
    width: width - 32,
  },
  bgStyle: {
    height: 200,
    width: width - 32,
    elevation: 8,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 20,
    position: "absolute",
    bottom: 50,
    left: 10,
    color: "black",
    fontFamily: "Oswald_500Medium",
  },
  author: {
    fontSize: 16,
    position: "absolute",
    bottom: 20,
    left: 10,
    color: "black",
    fontFamily: "Oswald_300Light",
  },
  recommendBookTitle: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Oswald_700Bold",
  }
})