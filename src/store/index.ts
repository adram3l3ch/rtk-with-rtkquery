import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useSelector as useNativeSelector, useDispatch as useNativeDispatch } from "react-redux";
import { counterReducer, postsReducer, thunkPostsReducer, userReducer } from "../features/slice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { todosApi, todosApiReducer } from "../features/api";

const reducer = combineReducers({
    user: userReducer,
    counter: counterReducer,
    posts: postsReducer,
    thunkPosts: thunkPostsReducer,
    [todosApi.reducerPath]: todosApiReducer,
});

const persistConfig = { key: "root", storage };

const persistedReducer = persistReducer(persistConfig, reducer);
export const store = configureStore({
    reducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(todosApi.middleware),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useSelector = useNativeSelector.withTypes<RootState>();
export const useDispatch: () => AppDispatch = useNativeDispatch;
