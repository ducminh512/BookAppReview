import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "./api";
import { _TOKEN_RENEW_INTERVAL } from "./const";
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
    console.debug("Refreshing access token ...");

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

  renewAccessTokenTaskId = setInterval(() => _renewAccessToken(refreshToken), 1000 * 15)
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