import { BASE_API_URL } from "../../share"
import React, { } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { routesName } from "../../../navigation/routes";

const { width } = Dimensions.get("window");

export const renderBookItem = (navigation) => ({ item, index }) => (
  <View style={style.container} >
    <Image
      resizeMode="cover"
      style={style.coverImg}
      source={{ uri: `${BASE_API_URL}/${item["cover_url"]}` }}
    />

    <View style={{ width: (width - 32) * 0.5, paddingLeft: 10 }}>
      <Text
        style={{
          fontSize: 15,
          marginBottom: 10,
          fontWeight: "bold",
          fontFamily: "Oswald_700Bold",
        }}
        numberOfLines={5}
      >
        {item?.title}
      </Text>
      <Text
        style={{
          fontSize: 13,
          marginBottom: 10,
          fontFamily: "Oswald_500Medium",
        }}
      >
        by {item?.author}
      </Text>
      <View
        style={{ flexDirection: "row", justifyContent: "space-between" }}
      >
        <Text
          style={{
            fontSize: 12,
            fontWeight: "600",
            fontFamily: "Oswald_300Light",
          }}
        >
          Page: {item.pages || 0}
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontWeight: "600",
            marginRight: 5,
            fontFamily: "Oswald_300Light",
          }}
        >
          Rating: {item["avg_rate"] || "2.5" }
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate(routesName.BOOK_DETAIL_SCREEN, { item });
        }}
        style={{
          marginTop: 20,
          width: 70,
          height: 30,
          borderColor: "red",
          borderRadius: 50 / 2,
          borderWidth: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 12,
            fontWeight: "600",
            fontFamily: "Oswald_500Medium",
          }}
        >
          Detail {'>>'}
        </Text>
      </TouchableOpacity>
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
    height: 200,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  }
})