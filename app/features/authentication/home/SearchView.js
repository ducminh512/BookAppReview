import { useFonts, FONTS } from "../../share";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { theme } from "../../../theme";
import { sdk } from "../../../core";
import { TopBar } from "./TopBar";
import { renderBookItem } from "./BookItem";
import { SAMPLE_BOOKS } from "../../../core/const";
import Header from "../../../components/Header";

const PAGE_SIZE = 20;

const SearchScreen = ({ route }) => {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation();
  const [books, setBooks] = useState(SAMPLE_BOOKS);
  const [keyword, setKeyword] = useState(route.params.initialKeyword);
  let [fontsLoaded] = useFonts(FONTS);

  useEffect(() => {
    sdk.getBooks(10, 0, keyword).then(({ data }) => {
      setBooks(data);
    })
  }, []);

  useEffect(() => {
    sdk.getBooks(10, 0, keyword).then(({ data }) => {
      setBooks(data);
    })
  }, [keyword]);


  const loadMoreBooks = async () => {
    console.log("load more books....");
    sdk.getBooks(PAGE_SIZE, books.length, keyword).then(({ data }) => setBooks([...books, ...data]))
  }

  return (
    <View style={[styles.container, { paddingTop: inset.top }]}>
      {fontsLoaded && (
        <FlatList
          ListHeaderComponent={<Header title={route.params.initialKeyword} />}
          data={books}
          renderItem={renderBookItem(navigation)}
          keyExtractor={(item, index) => `book-${item.id}`}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
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

const ListEmpty = () => (
  <View
    style={{
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Text style={{ fontSize: 30, fontFamily: "Oswald_700Bold" }}>No Data</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});

export default SearchScreen;
