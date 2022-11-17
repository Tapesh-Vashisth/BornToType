import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import themeReducer from "../features/theme/themeSlice";
import userReducer from "../features/user/userSlice";

const store = configureStore({
    reducer: {
        theme: themeReducer,
        user: userReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(logger)
})


export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch