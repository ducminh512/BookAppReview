import { useFonts, FONTS } from "../../share"
import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Carousel from "react-native-snap-carousel";
import TextInputForm from "../../../components/TextInputForm";
import { routesName } from "../../../navigation/routes";
import { theme } from "../../../theme";
import { api } from "../../../api";
import { TopBar } from "./TopBar";
import { RecommendBooks } from "./Recommend";
export const API_BOOKS_KEY = "AIzaSyB-OtACxBjF7rAudHEmIH_vT_CAu2d6p5U";
export const GOOGLE_BOOKS_URL = "https://www.googleapis.com/books";
export const KEY_HEADER = " :keyes&key=" + API_BOOKS_KEY;
export const ALL_EBOOKS_ENDPOInT = "/v1/volumes?q=";
export const FREE_BOOKS_ENPOINT = "/v1/volumes?q=flowers&filter=free-ebooks";

export async function getData(url, endpoint) {
  try {
    const fullURL = url + endpoint;
    console.log(fullURL);
    const response = await fetch(fullURL);
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    return error.toString();
  }
}
export const getAllEbooks = async (bookName) => {
  const endpoint = ALL_EBOOKS_ENDPOInT + bookName + KEY_HEADER;
  return await getData(GOOGLE_BOOKS_URL, endpoint);
};
export const getFreeEBooks = async () => {
  const endpoint = FREE_BOOKS_ENPOINT + KEY_HEADER;
  return await getData(GOOGLE_BOOKS_URL, endpoint);
};

const { width } = Dimensions.get("window");
const HomeScreen = () => {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [DataBook, setDataBook] = useState([]);
  const [keyword, setKeyword] = useState("");
  let [fontsLoaded] = useFonts(FONTS);

  useEffect(() => {
    api.getBooks().then(({ data }) => { console.log(data); setDataBook(data) })
  }, [isFocused, keyword]);

  const _renderItemBook = ({ item, index }) => {
    return (
      <View
        style={{
          width: width - 32,
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
        }}
      >
        {item["cover_url"] && (
          <Image
            resizeMode="cover"
            style={{
              width: (width - 32) * 0.5,
              height: 300,
              borderTopLeftRadius: 8,
              borderBottomLeftRadius: 8,
            }}
            source={{
              uri:
                item["cover_url"] ||
                "https://cogaidiem.com/wp-content/plugins/penci-portfolio//images/no-thumbnail.jpg",
            }}
          />
        )}

        <View style={{ width: (width - 32) * 0.5, paddingLeft: 10 }}>
          <Text
            style={{
              fontSize: 19,
              marginBottom: 10,
              fontWeight: "bold",
              fontFamily: "Oswald_700Bold",
            }}
            numberOfLines={3}
          >
            {item?.volumeInfo?.title}
          </Text>
          {typeof item?.author !== "undefined" &&
            item?.categories.map((item, index) => {
              return (
                <Text
                  style={{
                    fontSize: 16,
                    marginBottom: 10,
                    fontFamily: "Oswald_500Medium",
                  }}
                  key={index}
                >
                  by {item}
                </Text>
              );
            })}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                fontFamily: "Oswald_300Light",
              }}
            >
              Page: {item.page || 0}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                marginRight: 5,
                fontFamily: "Oswald_300Light",
              }}
            >
              Rating: {item["avg_rate"] || 0}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate(routesName.BOOK_DETAIL_SCREEN, { item });
            }}
            style={{
              marginTop: 20,
              width: 100,
              height: 45,
              borderColor: "red",
              borderRadius: 100 / 2,
              borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                fontFamily: "Oswald_500Medium",
              }}
            >
              Detail
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: inset.top }]}>
      <TopBar keyword={keyword} handleKeyWord={setKeyword} />
      <ScrollView
        style={{ flex: 1, }}
        showsVerticalScrollIndicator={false}
      >
        {fontsLoaded && (
          <>
            <View style={{ paddingHorizontal: 16 }}>
              <RecommendBooks />

              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  fontFamily: "Oswald_700Bold",
                }}
              >
                New Books
              </Text>
              <View style={{ height: 30 }} />
            </View>
            <FlatList
              data={DataBook}
              renderItem={_renderItemBook}
              keyExtractor={(item, index) => item.id.toString()}
              contentContainerStyle={{ flex: 1 }}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => {
                return <View style={{ width: 10 }} />;
              }}
              ListEmptyComponent={() => {
                return (
                  <View
                    style={{
                      height: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{ fontSize: 30, fontFamily: "Oswald_700Bold" }}
                    >
                      No Data
                    </Text>
                  </View>
                );
              }}
            />
          </>
        )}
      </ScrollView>
      <View style={{ height: inset.bottom + 100 }} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});

export default HomeScreen;