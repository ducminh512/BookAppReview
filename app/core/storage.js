import AsyncStorage from "@react-native-async-storage/async-storage"

const storeData = async (data, key) => {
    await AsyncStorage.setItem(key, JSON.stringify(data))
    return key
}

const getData = async (key) => {
    return JSON.parse(await AsyncStorage.getItem(key))
}

const clearData = async (key) => {
    await AsyncStorage.removeItem(key)
}

export const Storage = {
    storeData,
    getData,
    clearData,
}

export const StorageKeys = {
    userId: "userId",
    userInfo: "userInfo",
    refreshToken: "refreshToken",
    accessToken: "accessToken",
    refreshTokenTaskId: "refreshTokenTaskId",
}