import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    access_token: "",
    ID: "",
    role: "",
  },
  reducers: {
    set_access_token: (state, action) => {
      state.access_token = action.payload.access_token;
    },
    set_ID: (state, action) => {
      state.ID = action.payload.ID;
    },
    set_role: (state, action) => {
      state.role = action.payload.role;
    },
  },
});

const persistedReducer = persistReducer(persistConfig, userSlice.reducer);

export const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== "production",
});
export const persistor = persistStore(store);

export const { setUserType, setUserDetails, setDoctorForAppointment } =
  userSlice.actions;
