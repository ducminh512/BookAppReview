import {useFonts, FONTS} from "../../share"
import { useIsFocused, useNavigation } from "@react-navigation/native";
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
let bookOptions = ["Wanna Read", "Reading", "Read", "Favorites"];

const FavoriteScreen = () => {
  const inset = useSafeAreaInsets();
  const [books, setBooks] = useState(SAMPLE_BOOKS);
  let [fontsLoaded] = useFonts(FONTS);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [type, setType] = useState("Wanna Read");

  useEffect(() => {
  }, [])

  const renderItemTab = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setType(item);
        }}
        key={index}
        style={{
          width: (width - 52) / 4,
          alignItems: "center",
          backgroundColor:
            type === item ? theme.colors.white : theme.colors.blue,
          justifyContent: "center",
          height: 45,
          borderRadius: 8,
          marginRight: 5,
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
        <Text
          style={{
            fontFamily: "Oswald_500Medium",
            color: type === item ? "black" : "white",
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
        <View style={{ paddingHorizontal: 16, flex: 1 }}>
          <View style={{ flexDirection: "row" }}>
            {bookOptions.map(renderItemTab)}
          </View>
          <FlatList
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            data={books}
            renderItem={renderBookItem(navigation)}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}
      <View style={{ height: inset.bottom + 100 }} />
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
