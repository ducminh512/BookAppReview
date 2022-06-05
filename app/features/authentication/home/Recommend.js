import {
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { renderBookItem } from "./BookItem";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

export const RecommendBooks = ({recommendBooks}) => {
  const navigation = useNavigation();

  return (<>
    <View style={{ height: 10 }} />
    <Text style={styles.recommendBookTitle} >
      Highest Rates
    </Text>

    <View style={{ height: 5 }} />

    <Carousel
      data={recommendBooks}
      renderItem={renderBookItem(navigation)}
      sliderWidth={width - 32}
      itemWidth={width - 32}
      loop
      // autoplay
      // autoplayDelay={3000}
      horizontal
    />
  </>)
}

const styles = StyleSheet.create({
  recommendBookTitle: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Oswald_700Bold",
  }
})