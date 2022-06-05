import { useFonts, FONTS } from "../../share";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { theme } from "../../../theme";
import { sdk } from "../../../core";
import { SAMPLE_BOOKS } from "../../../core/const";
import Header from "../../../components/Header";
import { renderBookItem } from "../home/BookItem";

const PAGE_SIZE = 20;

const CategoryScreen = ({ route }) => {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation();
  const [books, setBooks] = useState(SAMPLE_BOOKS);
  let [fontsLoaded] = useFonts(FONTS);

  const { category } = route.params || {}

  useEffect(() => {
    sdk.filterCategory(category.id).then(({ data }) => { setBooks(data); })
  }, []);


  const loadMoreBooks = async () => {
    console.log("load more books....");
    sdk.filterCategory(category.id, PAGE_SIZE, books.length).then(({ data }) => setBooks([...books, ...data]))
  }

  return (
    <View style={[styles.container, { paddingTop: inset.top }]}>
      <Header title={"Category: " + category.name} />
      {fontsLoaded && (
        <FlatList
          ListHeaderComponent={() => (
            <View style={{ paddingHorizontal: 15 }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  fontFamily: "Oswald_700Bold",
                }}
              >
                {category.description}
              </Text>
              <View style={{ height: 10 }} />
            </View>
          )}
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

export default CategoryScreen;
