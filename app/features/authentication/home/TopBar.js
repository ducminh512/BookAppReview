import React from "react";
import { View } from "react-native";
import TextInputForm from "../../../components/TextInputForm";
import { theme } from "../../../theme";

export const TopBar = ({ keyword, handleKeyWord }) => {
  return (
    <View style={{ marginHorizontal: 16 }}>

      <TextInputForm
        style={{
          marginVertical: 5,
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
}