import axios from "axios"
import qs from 'qs'
import { Storage, StorageKeys } from "./storage";

export const BASE_API_URL = "https://api.mybooklist.ndtai.me";

const authHeader = (accessToken) => ({
  Authorization: `Bearer ${accessToken}`
})

function postReq(uri) {
  const url = BASE_API_URL + uri;
  return async function (data) {
    console.debug("sending POST request to " + url)
    return await axios.post(url, qs.stringify(data)).then(res => res.data)
      .catch(err => { console.error(err.response.data); throw err })
  }
}

function postReqAuth(uri) {
  const url = BASE_API_URL + uri;
  return async function (data) {
    console.debug("sending POST request to " + url)
    const accessToken = await Storage.getData(StorageKeys.accessToken)
    return await axios.post(url, qs.stringify(data), { headers: authHeader(accessToken) })
      .then(res => res.data)
      .catch(err => { console.error(err.response.data); throw err })
  }
}


async function getBooks(limit = 20, offset = 0, query = "") {
  const url = BASE_API_URL + "/books";
  console.debug("sending GET request to " + url)
  return await axios.get(url, {
    params: {
      "page_size": limit,
      "offset": offset,
      "q": query,
    }
  }).then(res => res.data)
}

async function getBookDetail(id) {
  const url = `${BASE_API_URL}/books/${id}`;
  console.debug("sending GET request to " + url)
  return await axios.get(url).then(res => res.data)
}

async function getBookComments(bookId, limit = 10, lastId = 1e9) {
  const url = `${BASE_API_URL}/books/${bookId}/comments`;
  console.debug("sending GET request to " + url)
  return await axios.get(url, {
    params: {
      "last_id": lastId,
      "page_size": limit,
    }
  }).then(res => res.data)
}

export const api = {
  getBooks,
  getBookComments,
  getBookDetail,

  createAccount: postReq("/accounts"),
  login: postReq("/auth/login"),
  refreshToken: postReq("/auth/refresh"),
  bookmarkBook: postReq("/bookmarks"),
  rateBook: postReq("/rates"),
  addComment: postReqAuth("/comments"),
}