import {
  useFonts,
  Roboto_100Thin,
  Roboto_100Thin_Italic,
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  Roboto_900Black_Italic,
} from "@expo-google-fonts/roboto";
import {
  Oswald_200ExtraLight,
  Oswald_300Light,
  Oswald_400Regular,
  Oswald_500Medium,
  Oswald_600SemiBold,
  Oswald_700Bold,
} from "@expo-google-fonts/oswald";
import { sdk } from "../core";
import moment from "moment";

export { useFonts };

export const FONTS = {
  Roboto_100Thin,
  Roboto_100Thin_Italic,
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  Roboto_900Black_Italic,
  Oswald_200ExtraLight,
  Oswald_300Light,
  Oswald_400Regular,
  Oswald_500Medium,
  Oswald_600SemiBold,
  Oswald_700Bold,
}

export const BOOKMARK_OPTIONS = [
  "Wanna read",
  "Reading",
  "Read",
  "Favorite",
  "Remove from library",
  "Cancel",
];

export const shortenString = (str = "", len) => {
  if (str.length < len + 3) return str;
  return str.substring(0, len) + "..."
}

export const toCoverUri = (uri) => `${sdk.BASE_API_URL}/covers/${uri}`
export const toImageUri = (uri) => `${sdk.BASE_API_URL}/covers/${uri}`
export const round = (rate) => (Math.round(rate * 100) / 100).toFixed(2);
export function timeDifference(previous) {

  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const elapsed = moment.now() - moment(previous).valueOf();

  if (elapsed < msPerMinute)
    return Math.round(elapsed / 1000) + ' seconds ago';
  if (elapsed < msPerHour)
    return Math.round(elapsed / msPerMinute) + ' minutes ago';
  if (elapsed < msPerDay)
    return Math.round(elapsed / msPerHour) + ' hours ago';
  if (elapsed < msPerMonth)
    return Math.round(elapsed / msPerDay) + ' days ago';
  if (elapsed < msPerYear)
    return + Math.round(elapsed / msPerMonth) + ' months ago';
  return + Math.round(elapsed / msPerYear) + ' years ago';
}
