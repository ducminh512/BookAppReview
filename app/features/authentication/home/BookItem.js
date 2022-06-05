import { toCoverUri } from "../../share"
import React, { } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { routesName } from "../../../navigation/routes";

const { width } = Dimensions.get("window");

export const renderBookItem = (navigation) => ({ item, index }) => (
  <View style={style.container} onTouchEnd={() => {
    navigation.navigate(routesName.BOOK_DETAIL_SCREEN, { item });
  }} >
    <Image
      resizeMode="cover"
      style={style.coverImg}
      source={{ uri: toCoverUri(item["cover_url"]), cache: "force-cache" }}
    />

    <View style={{ width: (width - 32) * 0.5, paddingLeft: 10 }}>
      <Text
        style={style.title}
        numberOfLines={3}
      >
        {item?.title}
      </Text>
      <Text numberOfLines={2}>
        <Text style={style.author} > {item?.author} </Text>
      </Text>
      <Text
        style={style.textNormal}
        numberOfLines={1}
      >
        Publish by {item?.publisher}
      </Text>
      <View
        style={{ flexDirection: "row", justifyContent: "space-between" }}
      >
        <Text style={style.textNormal} >
          Page: {item.pages || 0}
        </Text>
        <Text style={style.textNormal} >
          Avg rating: {item["rate_avg"]}
        </Text>
      </View>
    </View>
  </View>
)

const style = StyleSheet.create({
  container: {
    width: width - 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginVertical: 10,
    borderRadius: 8,
    elevation: 5,
    // paddingBottom:10,
    marginHorizontal: 16,
    backgroundColor: "white",
    flexDirection: "row",
  },
  coverImg: {
    width: (width - 32) * 0.4,
    height: 180,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  title: {
    fontSize: 15,
    marginBottom: 8,
    fontWeight: "800",
    fontFamily: "Oswald_700Bold",
  },
  author: {
    fontSize: 13,
    marginBottom: 10,
    fontWeight: "700",
    fontFamily: "Oswald_500Medium",
  },
  textNormal: {
    fontSize: 12,
    fontWeight: "600",
    fontFamily: "Oswald_300Light",
  }
})