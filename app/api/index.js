import axios from "axios"
import qs from 'qs'

const BASE_API_URL = "https://api.mybooklist.ndtai.me";

function postReq(uri) {
    const url = BASE_API_URL + uri;
    return async function (data) {
        return await axios.post(url, qs.stringify(data)).then(res => res.data)
    }
}

async function getBooks(limit = 20, offset = 0, query = "") {
    const url = BASE_API_URL + "/books";
    return await axios.get(url, {
        params: {
            "page_size": limit,
            "offset": offset,
            "q": query,
        }
    }).then(res => res.data)
}

export const api = {
    getBooks,
    createAccount: postReq("/accounts"),
    login: postReq("/auth/login"),
    refreshToken: postReq("/auth/refresh"),
    bookmarkBook: postReq("/bookmarks"),
    rateBook: postReq("/rates"),
    comment: postReq("/comments"),
}