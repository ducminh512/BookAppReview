import { createSlice } from "@reduxjs/toolkit"

const reduxSlice = createSlice({
    name: 'books',
    initialState: {
      loggedIn: false,
      bookmark: '',
      // bookdetails: []
      bookdetails: {
        current: [],
        wantTo: [],
        read: []
      },
      likedBooks: []
    },
    reducers: {
      setLogin(state, action) {
        state.loggedIn = action.payload
      },
      setBookmark(state, action) {
        state.bookmark = action.payload
      },
      setBookDetails(state, action) {
        state.bookdetails = action.payload
      },
      setLikedBooks(state, action) {
        state.likedBooks = action.payload
      },
    }
  })
  
  export const { setLogin, setBookmark, setBookDetails, setLikedBooks } = reduxSlice.actions
  export default reduxSlice.reducer