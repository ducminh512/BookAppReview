import { StatusBar } from "expo-status-bar";
import React from "react";
import { LogBox, StyleSheet } from "react-native";
import { FONTS, useFonts } from "./app/features/share";
import RootStack from "./app/navigation/rootStack";

LogBox.ignoreLogs(
  [
    "ViewPropTypes will be removed",
  ]
);
const App = () => {
  let [fontsLoaded] = useFonts(FONTS);
  return (
    <>
      <StatusBar style="dark" />
      {fontsLoaded ? <RootStack /> : null}
    </>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
