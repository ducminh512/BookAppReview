import { useFonts, FONTS, BASE_API_URL } from "../../share";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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
let bookOptions = [
  "Want to Read",
  "Start Reading",
  "Read",
  "Favorite Book",
  "Cancel Favorite Book",
  "Cancel",
];

const calcRate = (sum, count) => count === 0 ? 2.5 : sum / (2.0 * count);
const { width } = Dimensions.get("window");


export const BookView = ({ infoBook }) => {
  const [showSynopsis, setShowSynopsis] = useState(false);
  const [openSheet, setOpenSheet] = useState(false);
  const [rating, setRating] = useState(0);


  const showFullSynopsis = () => {
    setShowSynopsis((value) => !value);
    // console.log('message: ', bookMark)
  };

  return (
    <View style={{ marginTop: 15, marginHorizontal: 16 }}>
      <View
        style={{
          borderColor: "teal",
          borderWidth: 1,
          borderRadius: 10,
          padding: 20,
        }}
      >
        <View style={styles.imageContainer}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: `${BASE_API_URL}/covers/${infoBook["cover_url"]}`,
            }}
          />
        </View>
        <View style={styles.titleInfo}>
          <Text style={styles.title}>{infoBook.title}</Text>
          <Text style={styles.author}>by {infoBook.author}</Text>
          <View style={styles.bottomContent}>
            <Text style={{ fontFamily: "Oswald_500Medium" }}>
              <Text style={styles.bottom}>Published: </Text> {infoBook.publisher}
            </Text>
            <Text style={{ fontFamily: "Oswald_500Medium" }}>
              <Text style={styles.bottom}>Pages:</Text> {infoBook.pages}
            </Text>
          </View>
          <Text style={{ marginVertical: 10 }}>categories</Text>
          <Text style={styles.synopsis}>Synopsis</Text>
          <Text style={{ fontFamily: "Roboto_400Regular_Italic" }}>
            {showSynopsis ? infoBook.description : infoBook.description?.slice(0, 50) + "..."}
            <TouchableOpacity onPress={() => showFullSynopsis()}>
              <Text style={styles.showMore}>{showSynopsis ? "Show less" : "Show more"}</Text>
            </TouchableOpacity>
          </Text>
          <View style={styles.bottomContent}>

            <View style={styles.rating}>
              <Rating
                type="star"
                startingValue={2.5}
                imageSize={30}
                style={{ paddingVertical: 10 }}
              />
              <Text style={styles.ratingNumber}>
                {calcRate(infoBook["rate_sum"], infoBook["rate_count"])} / 5
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setOpenSheet(true);
              }}
            >
              <MaterialCommunityIcons
                name={"heart-outline"}
                // name="heart-outline"
                size={32}
                color={"red"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={{ height: 10 }} />
      <TextInputForm
        style={{
          borderWidth: 1,
          borderColor: theme.colors.placeholder,
          borderRadius: 4,
          paddingHorizontal: 12,
          height: width / 5,
        }}
        inputStyle={{
          height: width / 2,
        }}
        value={""}
        multiline={true}
        label="Write down your feeling <3"
        onChangeText={(text) => setReview(text)}
        textAlignVertical={"top"}
      />
      <Button
        title={"Send"}
        onPress={() => { }}
        backgroundColor={theme.colors.blue}
      />

      <BottomSheet modalProps={{}} isVisible={openSheet}>
        {bookOptions.map((l, i) => {
          return (
            <ListItem
              key={i}
              // containerStyle={l.containerStyle}
              onPress={() => {
                setOpenSheet(false);
              }}
            >
              <ListItem.Content>
                <ListItem.Title>
                  <View style={styles.bottomSheet}>
                    <Text>{l}</Text>
                    {/* {i !== 3 && selectedOption === i ? (
                                <Text>
                                  <Icon name="done" color="green" />
                                </Text>
                              ) : i === 3 ? (
                                <Text>
                                  <Icon name="close" color="red" />
                                </Text>
                              ) : (
                                <></>
                              )} */}
                  </View>
                </ListItem.Title>
              </ListItem.Content>
            </ListItem>
          );
        })}
      </BottomSheet>

      <Text style={styles.title}>Comments</Text>
    </View>
  )
};

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
    width: 200,
    height: 250,
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
})
