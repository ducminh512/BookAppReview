import { useFonts, FONTS } from "../../share";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { theme } from "../../../theme";
import { CATEGORIES } from "../../../core/const";
import { LinearGradient } from "expo-linear-gradient";
import { routesName } from "../../../navigation/routes";

const DiscoveryScreen = () => {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation();
  let [fontsLoaded] = useFonts(FONTS);

  return (
    <View style={[styles.container, { paddingTop: inset.top }]}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <Text style={{ fontSize: 20, fontFamily: "Roboto_500Medium", marginLeft: 15 }}>
          Book categories:
        </Text>

        <View style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {CATEGORIES.map(category => (
            <TouchableOpacity
              key={`category-${category.id}`}
              style={{
                backgroundColor: '#008B8B',
                borderColor: 'black',
                borderRadius: 10,
                width: '45%',
                height: 70,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 5,
              }}
              onPress={() => navigation.navigate(routesName.CATEGORY_DETAIL_SCREEN, { category })}
            >
              <LinearGradient
                colors={['rgba(255,255,255,0.4)', 'rgba(0,0,0,0.6)']}
                style={{
                  left: 0,
                  right: 0,
                  top: 0,
                  position: 'absolute',
                  height: '100%',
                  borderRadius: 10,
                }}
              />

              <Text style={{ fontSize: 16, fontFamily: "Roboto_500Medium", color: 'white' }}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ height: 50 }} />
      </ScrollView>
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

export default DiscoveryScreen;
