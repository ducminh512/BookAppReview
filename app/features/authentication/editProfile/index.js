import { useIsFocused, useNavigation } from "@react-navigation/core";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "../../../components/Button";
import Header from "../../../components/Header";
import TextInputForm from "../../../components/TextInputForm";
import { sdk } from "../../../core";
import { Storage, StorageKeys } from "../../../core/storage";
import { theme } from "../../../theme";

const { width } = Dimensions.get("window");

const EditProfileScreen = ({ route }) => {
  const { info } = route.params || {};
  const inset = useSafeAreaInsets();
  const [name, setName] = useState(info?.name);
  const [image, setImage] = useState(info ? info["avatar_url"] : "");
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [isLoadingSave, setIsLoadingSave] = useState(false);

  const navigation = useNavigation();
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(`${result.uri}`);
    }
  };

  const save = () => {
    sdk.updateAccountInfo(name)
      .then((data) => {
        Storage.storeData(data, StorageKeys.userInfo)
        navigation.goBack()
      })
  }

  // console.log("info", info);
  return (
    <View style={[styles.container, { paddingTop: inset.top }]}>
      <Header title="Edit Profile" />
      <ScrollView>
        <View style={{ paddingHorizontal: 16, paddingTop: 20 }}>
          <TouchableOpacity
            style={{
              width: 90,
              height: 90,
              borderRadius: 90,
              alignSelf: "center",
            }}
            onPress={() => {
              pickImage();
            }}
          >
            <Image
              style={{
                width: 90,
                height: 90,
                borderRadius: 90,
                alignItems: "center",
              }}
              resizeMode="contain"
              source={{
                uri: image,
              }}
            />
          </TouchableOpacity>

          <TextInputForm
            placeholder={"Username"}
            style={{
              borderWidth: 1,
              borderColor: theme.colors.placeholder,
              borderRadius: 4,
              paddingHorizontal: 12,
            }}
            value={name}
            label="Name"
            onChangeText={(text) => setName(text)}
          />
          <View style={{ height: 10 }} />
          <Button
            isLoading={isLoadingImage}
            title="Save"
            onPress={save}
            backgroundColor={theme.colors.orange}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
});
