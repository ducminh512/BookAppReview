import { useFonts, FONTS } from "../../share"
import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { theme } from "../../../theme";
import { sdk } from "../../../core";
import { TopBar } from "./TopBar";
import { RecommendBooks } from "./Recommend";
import { renderBookItem } from "./BookItem";

const PAGE_SIZE = 20;

const HomeScreen = () => {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [books, setBooks] = useState([]);
  const [keyword, setKeyword] = useState("");
  let [fontsLoaded] = useFonts(FONTS);

  useEffect(() => {
    sdk.getBooks().then(({ data }) => {
      console.debug(data[0]);
      setBooks(data);
    })
  }, [isFocused, keyword]);

  const loadMoreBooks = async () => {
    console.log("load more books....");
    sdk.getBooks(PAGE_SIZE, books.length).then(({ data }) => setBooks([...books, ...data]))
  }

  return (
    <View style={[styles.container, { paddingTop: inset.top }]}>
      <TopBar keyword={keyword} handleKeyWord={setKeyword} />
      {fontsLoaded && (
        <FlatList
          ListHeaderComponent={() => (
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
              <View style={{ height: 10 }} />
            </View>
          )}
          data={books}
          renderItem={renderBookItem(navigation)}
          keyExtractor={(item, index) => `book-${item.id}`}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
          ListEmptyComponent={ListEmpty}
          onEndReachedThreshold={0.7}
          onEndReached={loadMoreBooks}
          ListFooterComponent={() => (
            <View style={{ height: inset.bottom + 100 }} />
          )}
        />
      )}
    </View>
  );
};

const ListEmpty = () => (<View
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
)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});

export default HomeScreen;