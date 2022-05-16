import React, { } from "react";
import {
  Image,
  Text,
  View,
} from "react-native";
import TextInputForm from "../../../components/TextInputForm";
import { theme } from "../../../theme";

export const TopBar = ({ keyword, handleKeyWord }) => (
  <View style={{ marginHorizontal: 16 }}>
    <View style={{ flexDirection: "row", justifyContent: "space-between", }} >
      <Text
        style={{
          fontSize: 25,
          fontWeight: "bold",
          fontFamily: "Oswald_700Bold",
        }}
      >
        My Book List
      </Text>
      <Image
        style={{
          width: 40,
          height: 40,
          borderColor: "red",
          borderRadius: 20,
          borderWidth: 0.5,
        }}
        source={{
          uri: "https://cogaidiem.com/wp-content/plugins/penci-portfolio//images/no-thumbnail.jpg",
        }}
      />
    </View>

    <TextInputForm
      style={{
        marginVertical: 10,
        borderRadius: 4,
        borderWidth: 1,
        paddingHorizontal: 12,
        borderColor: theme.colors.lightGray,
      }}
      placeholder="Search by title, author, categories ..."
      value={keyword}
      onChangeText={handleKeyWord}
    />
  </View>
)
