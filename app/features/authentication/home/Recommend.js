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
import { renderBookItem } from "./BookItem";
import { useNavigation } from "@react-navigation/native";
import { SAMPLE_BOOKS } from "../../../core/const";

const { width } = Dimensions.get("window");

export const RecommendBooks = () => {
  const [recommendBooks, setRecommendBooks] = useState(SAMPLE_BOOKS);
  const navigation = useNavigation();

  useEffect(() => {
    let isMounted = true;
    api.getBooks(5, 20).then(({ data }) => { if (isMounted) setRecommendBooks(data); })
    return () => { isMounted = false }
  }, [])

  return (<>
    <View style={{ height: 10 }} />
    <Text style={styles.recommendBookTitle} >
      Recommend Books
    </Text>

    <View style={{ height: 10 }} />

    <Carousel
      data={recommendBooks}
      renderItem={renderBookItem(navigation)}
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
  recommendBookTitle: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Oswald_700Bold",
  }
})