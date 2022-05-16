import { api } from "./api";
import { Storage, StorageKeys } from "./storage";

const TOKEN_RENEW_TIME = 15 * 1000; // 15 second

async function login(email, password) {
    console.debug("Login....");
    const response = await api.login({ email, password });
    console.debug(response);

    Storage.storeData(response.account, StorageKeys.userInfo);
    Storage.storeData(response.account["id"], StorageKeys.userId);
    Storage.storeData(response["access_token"], StorageKeys.accessToken);
    await Storage.storeData(response["refresh_token"], StorageKeys.refreshToken);

    const refreshTokenTaskId = setInterval(refreshToken, TOKEN_RENEW_TIME);
    Storage.storeData(refreshTokenTaskId, StorageKeys.refreshTokenTaskId);

    console.log("finish");
}

async function refreshToken() {
    console.debug("refreshing token ...");
    const refreshToken = await Storage.getData(StorageKeys.refreshToken);

    async function clear() {
        const refreshTokenTaskId = await Storage.getData(StorageKeys.refreshTokenTaskId);
        clearInterval(refreshTokenTaskId);
    }

    if (refreshToken === null) {
        await clear()
        return;
    }

    api.refreshToken({ "refresh_token": refreshToken })
        .then(response => {
            Storage.storeData(response["access_token"], StorageKeys.accessToken);
        })
        .catch((err) => { console.debug(err.response.data); clear() })
}

async function _userId() {
    return await Storage.getData(StorageKeys.userId);
}


export const sdk = {
    login
}