import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDocs, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/config";

// Define initial state and reducers
const favouritesSlice = createSlice({
  name: "favourites",
  initialState: {
    favourites: [],
    loading: false,
    error: null,
  },
  reducers: {
    /* fetchFavouritesSuccess(state, action) {
      state.favourites = action.payload
      state.loading = false
      state.error = null
    },
    fetchFavouritesFailure(state, action) {
      state.favourites = []
      state.loading = false
      state.error = action.payload
    }, 
    addFavourite(state, action) {
      state.favourites.push(action.payload)
    },
    removeFavourite(state, action) {
      state.favourites = state.favourites.filter((favourite) => favourite.name.common !== action.payload)
    }, */
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFavourites.fulfilled, (state, action) => {
        state.favourites = action.payload;
      })
      .addCase(addFavourites.fulfilled, (state, action) => {
        state.favourites = action.payload;
      })
      .addCase(deleteFavourite.fulfilled, (state, action) => {
        state.favourites = action.payload;
      });
  },
});

// get all favourites
export const getFavourites = createAsyncThunk(
  "get/favouriteCountries",
  async (docId) => {
    if (!docId) return [];

    const querySnapshot = await getDocs(collection(db, "users"));
    let data;

    querySnapshot.forEach((docSnap) => {
      if (docSnap.id === docId) data = docSnap.data();
    });

    return data.fav;
  }
);

// add to favourites
export const addFavourites = createAsyncThunk(
  "add/favouriteCountries",
  async ({ docId, newDataToAdd }, { getState }) => {
    if (!docId) return [];

    const previousFavourites = getState().favourites.favourites;

    await updateDoc(doc(db, "users", docId), {
      fav: [...previousFavourites, newDataToAdd],
    });

    return [...previousFavourites, newDataToAdd];
  }
);

// delete from favourites
export const deleteFavourite = createAsyncThunk(
  "remove/favouriteCountries",
  async ({ docId, countryName }, { getState }) => {
    if (!docId) return [];

    const previousFavourites = getState().favourites.favourites;

    const filteredFavourites = previousFavourites.filter(
      (eachCountry) => eachCountry.name.common !== countryName
    );

    await updateDoc(doc(db, "users", docId), {
      fav: [...filteredFavourites],
    });

    return [...filteredFavourites];
  }
);

export const {
  fetchFavouritesSuccess,
  fetchFavouritesFailure,
  addFavourite,
  removeFavourite,
} = favouritesSlice.actions;
export default favouritesSlice.reducer;
