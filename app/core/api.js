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
      .catch(err => { console.debug("Error response: " + JSON.stringify(err.response.data)); throw err })
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
      .catch(err => { console.debug("Error response: " + JSON.stringify(err.response.data)); throw err })
  }
}

function makeUpdateReq(uri) {
  const url = BASE_API_URL + uri;
  return async function (data) {
    console.debug("sending UPDATE request to " + url)
    const accessToken = await Storage.getData(StorageKeys.accessToken);
    const patchData = qs.stringify(data);
    return await axios.patch(url, patchData, { headers: authHeader(accessToken) })
      .then(res => res.data)
      .catch(err => { console.debug("Error response: " + JSON.stringify(err.response.data)); throw err })
  }
}

function makeDeleteReq(uri) {
  const url = BASE_API_URL + uri;
  return async function () {
    console.debug("sending DELETE request to " + url)
    const accessToken = await Storage.getData(StorageKeys.accessToken);
    return await axios.delete(url, {
      headers: authHeader(accessToken)
    })
      .catch(err => { console.debug("Error response: " + JSON.stringify(err.response.data)); throw err })
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
      "page_size": 15
    }
  })
}
export async function updateAccountInfo(name) {
  const userInfo = await Storage.getData(StorageKeys.userInfo);
  return await makeUpdateReq(`/accounts/${userInfo.id}`)({
    name
  })
}
export async function updateAccountPassword(password) {
  const userInfo = await Storage.getData(StorageKeys.userInfo);
  return await makeUpdateReq(`/accounts/${userInfo.id}/password`)({
    password
  })
}

// auth
export const _login = makePostReq("/auth/login");
export const _refreshToken = makePostReq("/auth/refresh");

export const createAccount = makePostReq("/accounts");

// bookmarks
export async function getBookmarks() {
  const userInfo = await Storage.getData(StorageKeys.userInfo);
  return await makeGetReq(`/accounts/${userInfo.id}/bookmarks`, { auth: true })({ params: {} })
}
export const addBookmark = makePostReq("/bookmarks", { auth: true });
export async function checkBookmark(bookId) {
  const userInfo = await Storage.getData(StorageKeys.userInfo);
  return await makeGetReq("/bookmarks", { auth: true })({
    params: {
      "account_id": userInfo.id,
      "book_id": bookId,
    }
  })
}
export async function deleteBookmark(bookmarkId) {
  return await makeDeleteReq(`/bookmarks/${bookmarkId}`)()
}
export async function updateBookmark(bookmarkId, bookmarkType) {
  return await makeUpdateReq(`/bookmarks/${bookmarkId}`)({
    "bookmark_type": bookmarkType
  })
}

// rates
export const rateBook = makePostReq("/rates", { auth: true });
export async function checkRate(bookId) {
  const userInfo = await Storage.getData(StorageKeys.userInfo);
  return await makeGetReq("/rates", { auth: true })({
    params: {
      "account_id": userInfo.id,
      "book_id": bookId,
    }
  })
}
export async function updateRate(rateId, newScore) {
  return await makeUpdateReq(`/bookmarks/${rateId}`)({
    "score": newScore
  })
}

// comments
export const addComment = makePostReq("/comments", { auth: true });

// categories
export async function filterCategory(categoryId, limit = 10, offset = 0) {
  return await makeGetReq(`/categories/${categoryId}/books`)({
    params: {
      limit,
      offset,
    }
  })
}