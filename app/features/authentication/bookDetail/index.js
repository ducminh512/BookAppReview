import { useFonts, FONTS, BASE_API_URL } from "../../share";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BottomSheet, ListItem, Rating } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "../../../components/Button";
import Header from "../../../components/Header";
import TextInputForm from "../../../components/TextInputForm";
import { theme } from "../../../theme";
import { sdk } from "../../../core";
import { api } from "../../../core/api";
import { BookView } from "./BookView";
let bookOptions = [
  "Want to Read",
  "Start Reading",
  "Read",
  "Favorite Book",
  "Cancel Favorite Book",
  "Cancel",
];

const { width } = Dimensions.get("window");

const calcRate = (sum, count) => count === 0 ? 2.5 : sum / (2.0 * count);

const BookDetail = ({ route }) => {
  const navigation = useNavigation();
  const inset = useSafeAreaInsets();

  const isFocused = useIsFocused();
  const { item } = route.params || {};
  const [infoBook, setInfoBook] = useState(item);
  // const [reviewList, setReviewList] = useState([]);

  const [review, setReview] = useState("");

  let [fontsLoaded] = useFonts(FONTS);
  // console.log({ bookAll });

  useEffect(() => {
    api.getBookDetail(item.id).then(book => setInfoBook(book))
  }, []);

  return (
    <View style={[styles.container, { paddingTop: inset.top }]}>
      <Header title="Book detail" />
      <FlatList
        ListHeaderComponent={() => (<BookView infoBook={infoBook} />)}
        data={[1, 2, 3, 4, 5]}
        renderItem={({ item, index }) => {
          console.log({ item });
          return (
            <View
              style={{
                width: width - 40,
                marginLeft: 5,
                padding: 12,
                flexDirection: "row",
                marginVertical: 10,
                backgroundColor: "white",
                borderRadius: 8,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
              }}
            >
              <Image
                source={{
                  uri: "https://cogaidiem.com/wp-content/plugins/penci-portfolio//images/no-thumbnail.jpg",
                }}
                style={{ height: 50, width: 50, borderRadius: 50 / 2 }}
              />
              <View style={{ paddingLeft: 10 }}>
                <Text style={{ fontFamily: "Roboto_500Medium" }}>
                  Dao Duc Minh
                </Text>
                <Rating
                  type="star"
                  startingValue={0}
                  readonly
                  imageSize={15}
                  style={{ paddingVertical: 10 }}
                />
                <Text style={{ fontFamily: "Roboto_500Medium" }}>
                  review
                </Text>
              </View>

              <MaterialCommunityIcons
                name="window-close"
                size={24}
                color={"red"}
                style={{ position: "absolute", right: 10, top: 5 }}
                onPress={() => { }}
              />
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />

    </View>
  );
};

const Comment = () => (
  <View
    style={{
      width: width - 40,
      marginLeft: 5,
      padding: 12,
      flexDirection: "row",
      marginVertical: 10,
      backgroundColor: "white",
      borderRadius: 8,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
    }}
  >
    <Image
      source={{
        uri: "https://cogaidiem.com/wp-content/plugins/penci-portfolio//images/no-thumbnail.jpg",
      }}
      style={{ height: 50, width: 50, borderRadius: 50 / 2 }}
    />
    <View style={{ paddingLeft: 10 }}>
      <Text style={{ fontFamily: "Roboto_500Medium" }}>
        Dao Duc Minh
      </Text>
      <Rating
        type="star"
        startingValue={0}
        readonly
        imageSize={15}
        style={{ paddingVertical: 10 }}
      />
      <Text style={{ fontFamily: "Roboto_500Medium" }}>
        review
      </Text>
    </View>

    <MaterialCommunityIcons
      name="window-close"
      size={24}
      color={"red"}
      style={{ position: "absolute", right: 10, top: 5 }}
      onPress={() => { }}
    />
  </View>
)

export default BookDetail;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  imageContainer: {
    display: "flex",
    alignItems: "center",
    paddingBottom: 20,
  },
  titleInfo: {
    alignItems: "center",
    padding: 5,
  },
  title: {
    // fontWeight: 'bold',
    fontSize: 20,
    fontFamily: "Oswald_700Bold",
  },
  author: {
    color: "grey",
    fontSize: 14,
    fontFamily: "Oswald_500Medium",
  },
  rating: {
    display: "flex",
    flexDirection: "row",
  },
  ratingNumber: {
    padding: 15,
    fontFamily: "Oswald_500Medium",
  },
  tinyLogo: {
    width: 130,
    height: 200,
  },
  synopsis: {
    // fontWeight: 'bold',
    fontSize: 18,
    paddingBottom: 10,
    fontFamily: "Oswald_700Bold",
  },
  showMore: {
    textDecorationLine: "underline",
    color: "teal",
    fontSize: 14,
  },
  bottomContent: {
    width: "100%",
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "space-between",
  },
  bottomSheet: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: 400,
  },
});
