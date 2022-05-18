import { useFonts, FONTS } from "../../share";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../../../components/Header";
import { theme } from "../../../theme";
import { sdk } from "../../../core";
import { BookView } from "./BookView";


const BookDetail = ({ route }) => {
  const inset = useSafeAreaInsets();

  const { item } = route.params || {};
  const [infoBook, setInfoBook] = useState(item);
  const [comments, setComments] = useState([]);
  // const [reviewList, setReviewList] = useState([]);

  const [review, setReview] = useState("");

  let [fontsLoaded] = useFonts(FONTS);
  // console.log({ bookAll });

  useEffect(() => {
    sdk.getBookDetail(item.id).then(book => setInfoBook(book))
  }, []);

  // const lastIndex = comments.length === 0 ? 1e9 : comments[comments.length - 1].id

  useEffect(() => {
    sdk.getBookComments(item.id, 10)
      .then(({ data }) => setComments([...comments, ...data]))
  }, [])

  return (
    <View style={[styles.container, { paddingTop: inset.top }]}>
      <Header title="Book detail" />
      <FlatList
        ListHeaderComponent={() => (
          <BookView
            infoBook={infoBook}
            handleNewComment={cmt => {
              console.log(cmt);
              setComments([cmt, ...comments])
            }}
          />
        )}
        data={comments}
        renderItem={renderComment}
        keyExtractor={(item, index) => index.toString()}
      />

    </View>
  );
};

const renderComment = ({ item }) => (
  <View
    style={{
      marginHorizontal: 16,
      padding: 12,
      flexDirection: "row",
      marginVertical: 5,
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
      source={{ uri: item["avatar_url"], }}
      style={{ height: 50, width: 50, borderRadius: 50 / 2 }}
    />
    <View style={{ paddingLeft: 10, paddingRight: 40 }}>
      <Text style={{ fontFamily: "Roboto_700Bold" }}>
        {item.username}
      </Text>
      <Text style={{ fontFamily: "Roboto_500Medium" }}>
        {item.content}
      </Text>
    </View>
  </View>
);

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
