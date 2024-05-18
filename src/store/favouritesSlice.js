import { createSlice } from "@reduxjs/toolkit";
import { db } from "../config/config";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  deleteField,
} from "firebase/firestore";

// Action to fetch favourites from Firestore
export const fetchFavourites = (userId) => {
  return async (dispatch) => {
    try {
      const favouritesCol = collection(db, "users", userId, "favourites");
      const favouritesSnapshot = await getDocs(favouritesCol);
      const favouritesList = favouritesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(fetchFavouritesSuccess(favouritesList));
    } catch (error) {
      dispatch(fetchFavouritesFailure(error.message));
    }
  };
};

// Action to add a favourite to Firestore
export const addFavouriteToFirestore = (userId, favourite) => {
  return async (dispatch) => {
    try {
      const favouritesDoc = doc(
        db,
        "users",
        userId,
        "favourites",
        favourite.id
      );
      await setDoc(favouritesDoc, favourite);
      dispatch(addFavourite(favourite));
    } catch (error) {
      // Handle error
    }
  };
};

// Action to remove a favourite from Firestore
export const removeFavouriteFromFirestore = (userId, favouriteId) => {
  return async (dispatch) => {
    try {
      const favouritesDoc = doc(db, "users", userId, "favourites", favouriteId);
      await updateDoc(favouritesDoc, {
        [favouriteId]: deleteField(),
      });
      dispatch(removeFavourite(favouriteId));
    } catch (error) {
      alert.error(error);
    }
  };
};

// Define initial state and reducers
const favouritesSlice = createSlice({
  name: "favourites",
  initialState: {
    favourites: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchFavouritesSuccess(state, action) {
      state.favourites = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchFavouritesFailure(state, action) {
      state.favourites = [];
      state.loading = false;
      state.error = action.payload;
    },
    addFavourite(state, action) {
      state.favourites.push(action.payload);
    },
    removeFavourite(state, action) {
      state.favourites = state.favourites.filter(
        (favourite) => favourite.name.common !== action.payload
      );
    },
  },
});

export const {
  fetchFavouritesSuccess,
  fetchFavouritesFailure,
  addFavourite,
  removeFavourite,
} = favouritesSlice.actions;
export default favouritesSlice.reducer;
