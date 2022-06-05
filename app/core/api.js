import axios from "axios"
import qs from 'qs'
import { BASE_API_URL } from "./const";
import { Storage, StorageKeys } from "./storage";

const authHeader = (accessToken) => ({
  Authorization: `Bearer ${accessToken}`
})

function makePostReq(uri, conf = { auth: false }) {
  const url = BASE_API_URL + uri;
  return async function (data) {
    console.debug("sending POST request to " + url)
    const accessToken = conf.auth ? await Storage.getData(StorageKeys.accessToken) : "";
    const postData = qs.stringify(data);
    return await axios.post(url, postData, { headers: authHeader(accessToken) })
      .then(res => res.data)
      .catch(err => { console.debug("Error response: " + err.response.data); throw err })
  }
}

function makeGetReq(uri, conf = { auth: false }) {
  const url = BASE_API_URL + uri;
  return async function ({ params = {} }) {
    console.debug("sending GET request to " + url)
    const accessToken = conf.auth ? await Storage.getData(StorageKeys.accessToken) : "";
    return await axios.get(url, {
      params,
      headers: authHeader(accessToken)
    })
      .then(res => res.data)
      .catch(err => { console.error(err.response.data); throw err })
  }
}


// books
export async function getBooks(limit = 20, offset = 0, query = "") {
  return await makeGetReq("/books")({
    params: {
      "page_size": limit,
      "q": query,
      offset,
    }
  })
}

export async function getBookDetail(id) {
  return await makeGetReq(`/books/${id}`)({ params: {} })
}

export async function getBookComments(bookId, limit = 10, lastId = 1e9) {
  return await makeGetReq(`/books/${bookId}/comments`)({
    params: {
      "last_id": lastId,
      "page_size": limit
    }
  })
}

// accounts
export async function getUserComments() {
  const userInfo = await Storage.getData(StorageKeys.userInfo);
  return await makeGetReq(`/accounts/${userInfo.id}/comments`, { auth: true })({
    params: {
      "page_size": 1e9
    }
  })
}

export async function getBookmarks() {
  const userInfo = await Storage.getData(StorageKeys.userInfo);
  return await makeGetReq(`/accounts/${userInfo.id}/bookmarks`, { auth: true })({ params: {} })
}

// auth
export const _login = makePostReq("/auth/login");
export const _refreshToken = makePostReq("/auth/refresh");

export const createAccount = makePostReq("/accounts");

// bookmarks
export const addBookmark = makePostReq("/bookmarks", { auth: true });
export const bookmarkBook = makePostReq("/bookmarks");


export const rateBook = makePostReq("/rates");


export const addComment = makePostReq("/comments", { auth: true });