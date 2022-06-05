import Icons from "@expo/vector-icons/Ionicons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "../../../components/Button";
import { sdk } from "../../../core";
import { routesName } from "../../../navigation/routes";
import { theme } from "../../../theme";
import { FONTS, useFonts } from "../../share";
const { width } = Dimensions.get("window");

const ProfileScreen = () => {
  const inset = useSafeAreaInsets();
  const [info, setInfo] = useState({});
  const [comments, setComments] = useState([]);

  let [fontsLoaded] = useFonts(FONTS);
  const navigation = useNavigation();

  useEffect(() => {
    sdk.getCurrentUserInfo().then(user => setInfo(user))
    sdk.getUserComments().then(({data}) => {
      console.log("comments: ", data);
      setComments(data)
    })
  }, [])

  return (
    <View style={[styles.container, { paddingTop: inset.top }]}>
      <ScrollView>
        {fontsLoaded && (
          <>
            <View style={{ flexDirection: "row", paddingHorizontal: 16 }}>
              <Image
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 90 / 2,
                }}
                source={{ uri: info["avatar_url"] ?? "", }}
              />
              <View
                style={{
                  paddingLeft: 30,
                  paddingTop: 10,
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    fontFamily: "Oswald_700Bold",
                  }}
                >
                  {info.name ?? ""}
                </Text>
                <View style={{ height: 5 }} />
                <Text style={{ fontFamily: "Oswald_500Medium" }}>
                  {info.email ?? ""}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(routesName.EDIT_PROFILE_SCREEN)
                }
              >
                <Icons name="create-outline" size={24} />
              </TouchableOpacity>
            </View>
            <View style={{ marginHorizontal: 20, marginTop: 25 }}>
              <Button
                title={"Change Password"}
                backgroundColor={theme.colors.orange}
                onPress={() => {
                  navigation.navigate(routesName.CHANGE_PASSWORD_SCREEN);
                }}
              />
              <Button
                title={"LogOut"}
                backgroundColor={theme.colors.orange}
                onPress={() => {
                  sdk.logout()
                  navigation.navigate(routesName.LOGIN_SCREEN)
                }}
              />
              <Text style={{ fontFamily: "Oswald_700Bold", fontSize: 20 }}>
                My Reviews
              </Text>
              {<View>{comments.map(renderComment)}</View>}
            </View>
          </>
        )}
        <View style={{ height: inset.bottom + 100 }} />
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
});

export const renderComment = ({ item }) => {
  console.log(item);
  return (
  <View
    style={{
      marginHorizontal: 16,
      padding: 12,
      flexDirection: "row",
      marginVertical: 5,
      backgroundColor: "white",
      borderRadius: 8,
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
    {/* <Image
      source={{ uri: `${BASE_API_URL}/${item["cover_url"] ?? ""}` }}
      style={{ height: 50, width: 50, borderRadius: 50 / 2 }}
    /> */}
    <View style={{ paddingLeft: 10, paddingRight: 40 }}>
      <Text style={{ fontFamily: "Roboto_700Bold" }}>
        {item.title ?? ""}
      </Text>
      <Text style={{ fontFamily: "Roboto_500Medium" }}>
        {item.content ?? ""}
      </Text>
    </View>
  </View>
);
}