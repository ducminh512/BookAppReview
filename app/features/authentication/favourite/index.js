import { useFonts, FONTS } from "../../share"
import { useFocusEffect, useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { routesName } from "../../../navigation/routes";
import { theme } from "../../../theme";
import { SAMPLE_BOOKS } from "../../../core/const";
import { renderBookItem } from "../home/BookItem";
import { sdk } from "../../../core";

const { width } = Dimensions.get("window");
let bookmarkTypes = ["Wanna Read", "Reading", "Read", "Favorites"];

const FavoriteScreen = () => {
  const inset = useSafeAreaInsets();
  const [allBookmarks, setAllBookmarks] = useState([]);
  const [books, setBooks] = useState(SAMPLE_BOOKS);
  let [fontsLoaded] = useFonts(FONTS);
  const navigation = useNavigation();
  const [type, setType] = useState(0);

  useFocusEffect(React.useCallback(() => {
    sdk.getBookmarks().then(({ data }) => {
      setAllBookmarks(data)
      setBooks(data.filter(b => b["bookmark_type"] == type))
    })
  }, []))

  useEffect(() => {
    setBooks(allBookmarks.filter(b => b["bookmark_type"] == type))
  }, [type, allBookmarks])

  const renderItemTab = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => { setType(index); }}
        key={index}
        style={{
          width: (width - 52) / 4,
          alignItems: "center",
          backgroundColor:
            type === index ? theme.colors.white : theme.colors.blue,
          justifyContent: "center",
          height: 40,
          borderRadius: 8,
          marginRight: 5,
          marginTop: 10,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 4,
        }}
      >
        <Text
          style={{
            fontFamily: "Oswald_500Medium",
            color: type === index ? "black" : "white",
          }}
        >
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: inset.top }]}>
      {fontsLoaded && (
        <View style={{ paddingHorizontal: 8, flex: 1 }}>
          <View style={{ flexDirection: "row", marginLeft: 10 }}>
            {bookmarkTypes.map(renderItemTab)}
          </View>
          <FlatList
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            data={books}
            renderItem={renderBookItem(navigation)}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={<View style={{ height: inset.bottom + 50 }} />}
          />
        </View>
      )}
    </View>
  );
};

export default FavoriteScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
});
