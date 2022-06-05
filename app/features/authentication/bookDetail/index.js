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
import { sdk } from "../../../core";
import { BookView } from "./BookView";
import moment from "moment";


const BookDetail = ({ route }) => {
  const inset = useSafeAreaInsets();

  const { item } = route.params || {};
  const [infoBook, setInfoBook] = useState(item);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    sdk.getBookDetail(item.id).then(book => {
      setInfoBook(book)
    }).catch(err => console.log("fetch book detail error!"))
      .then(
        sdk.getBookComments(item.id, 10)
          .then(({ data }) => setComments([...comments, ...data]))
      )
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
        ListFooterComponent={()=>(
          <View style={{height: 15}} />
        )}
      />

    </View>
  );
};

export const renderComment = ({ item }) => (
  <View
    style={{
      marginHorizontal: 18,
      padding: 10,
      flexDirection: "row",
      marginVertical: 2,
      borderRadius: 8,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 2,
    }}
  >
    <Image
      source={{ uri: item["avatar_url"], }}
      style={{ height: 40, width: 40, borderRadius: 50 / 2 }}
    />
    <View style={{ paddingLeft: 10, paddingRight: 40 }}>
      <Text>
        <Text style={{ fontFamily: "Roboto_700Bold" }}>
          {item.username}
        </Text>
        {" " + timeDifference(item["created_at"])}
      </Text>
      <Text style={{ fontFamily: "Roboto_500Medium" }}>
        {item.content}
      </Text>
    </View>
  </View>
);

function timeDifference(previous) {

  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = moment.now() -  moment(previous).valueOf();

  if (elapsed < msPerMinute)
    return Math.round(elapsed / 1000) + ' seconds ago';
  if (elapsed < msPerHour)
    return Math.round(elapsed / msPerMinute) + ' minutes ago';
  if (elapsed < msPerDay)
    return Math.round(elapsed / msPerHour) + ' hours ago';
  if (elapsed < msPerMonth)
    return Math.round(elapsed / msPerDay) + ' days ago';
  if (elapsed < msPerYear)
    return + Math.round(elapsed / msPerMonth) + ' months ago';
  return + Math.round(elapsed / msPerYear) + ' years ago';
}


export default BookDetail;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDF5E6",
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
