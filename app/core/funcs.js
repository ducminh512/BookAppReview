import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "./api";
import { _TOKEN_RENEW_INTERVAL } from "./const";
import { Storage, StorageKeys } from "./storage";

let renewAccessTokenTaskId = null;

export async function renewAccessToken() {
  console.debug("refreshing token ...");
  const refreshToken = await Storage.getData(StorageKeys.refreshToken);

  function clear() {
    AsyncStorage.multiRemove([
      StorageKeys.accessToken,
      StorageKeys.refreshToken,
      StorageKeys.userInfo
    ])
    if (renewAccessTokenTaskId !== null)
      clearInterval(renewAccessTokenTaskId);
  }

  if (refreshToken === null) {
    clear()
    return;
  }

  if (renewAccessTokenTaskId === null) {
    renewAccessTokenTaskId = setInterval(renewAccessToken, _TOKEN_RENEW_INTERVAL);
  }

  api._refreshToken({ "refresh_token": refreshToken })
    .then(response => {
      Storage.storeData(response["access_token"], StorageKeys.accessToken);
    })
    .catch((err) => {
      console.debug(err.response.data);
      clear();
      throw err
    })
}

export async function login(email, password) {
  console.debug("Login....");
  const response = await api._login({ email, password }).catch(err => {
    console.debug("Login request error!");
    throw err
  });
  console.debug(response);

  Storage.storeData(response.account, StorageKeys.userInfo);
  Storage.storeData(response.account["id"], StorageKeys.userId);
  Storage.storeData(response["access_token"], StorageKeys.accessToken);
  await Storage.storeData(response["refresh_token"], StorageKeys.refreshToken);

  renewAccessTokenTaskId = setInterval(renewAccessToken, _TOKEN_RENEW_INTERVAL);

  console.log("finish");
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