import { api } from "./api";
import { _TOKEN_RENEW_INTERVAL } from "./const";
import { Storage, StorageKeys } from "./storage";

async function _refreshToken() {
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

export async function login(email, password) {
    console.debug("Login....");
    const response = await api.login({ email, password });
    console.debug(response);

    Storage.storeData(response.account, StorageKeys.userInfo);
    Storage.storeData(response.account["id"], StorageKeys.userId);
    Storage.storeData(response["access_token"], StorageKeys.accessToken);
    await Storage.storeData(response["refresh_token"], StorageKeys.refreshToken);

    const refreshTokenTaskId = setInterval(_refreshToken, _TOKEN_RENEW_INTERVAL);
    Storage.storeData(refreshTokenTaskId, StorageKeys.refreshTokenTaskId);

    console.log("finish");
}


export async function getCurrentUserInfo() {
    return await Storage.getData(StorageKeys.userInfo);
}