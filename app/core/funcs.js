import AsyncStorage from "@react-native-async-storage/async-storage";
import * as api from "./api";
import { CATEGORIES, _TOKEN_RENEW_INTERVAL } from "./const";
import { Storage, StorageKeys } from "./storage";

let renewAccessTokenTaskId = null;

export async function setRenewAccessTokenLoop() {

  const refreshToken = await Storage.getData(StorageKeys.refreshToken);

  if (renewAccessTokenTaskId !== null || refreshToken === null) {
    clearInterval(renewAccessTokenTaskId)
    renewAccessTokenTaskId = null
    return
  }

  async function _renewAccessToken(refreshToken) {
    async function clear() {
      clearInterval(renewAccessTokenTaskId);
      await AsyncStorage.multiRemove([
        StorageKeys.accessToken,
        StorageKeys.refreshToken,
        StorageKeys.userInfo
      ])
    }

    if (refreshToken === null) {
      await clear()
      return;
    }

    api._refreshToken({ "refresh_token": refreshToken })
      .then(response => {
        Storage.storeData(response["access_token"], StorageKeys.accessToken);
      })
      .catch((err) => clear().then(() => { throw err }))
  }

  renewAccessTokenTaskId = setInterval(() => _renewAccessToken(refreshToken), _TOKEN_RENEW_INTERVAL)
}

export async function login(email, password) {
  const response = await api._login({ email, password });
  console.debug(response);

  Storage.storeData(response.account, StorageKeys.userInfo);
  Storage.storeData(response["access_token"], StorageKeys.accessToken);
  await Storage.storeData(response["refresh_token"], StorageKeys.refreshToken);

  setRenewAccessTokenLoop()
}

export async function getCurrentUserInfo() {
  return await Storage.getData(StorageKeys.userInfo);
}


export async function logout() {
  AsyncStorage.multiRemove([
    StorageKeys.accessToken,
    StorageKeys.refreshToken,
    StorageKeys.userInfo
  ])
}

const CATEGORY_NAMES = CATEGORIES.reduce((categories, record) => {
  categories[record.id] = record.name;
  return categories
}, {})

export function getCategoryName(id) {
  return CATEGORY_NAMES[id] ?? ""
}