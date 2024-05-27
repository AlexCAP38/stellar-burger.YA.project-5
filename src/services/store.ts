import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

//Импорты слайсов и редьюсеров
import { ingredientsSlice } from './reducers/ingredients/slice';
import { makeBurgerSlice } from './reducers/constructorBurger/slice';
import { userSlice } from './reducers/user/slice';
import { feedSlice } from './reducers/feed/slice';

//Заполнение корневого редьюсера
export const rootReducer = combineReducers({
  ingredientsSlice: ingredientsSlice.reducer,
  makeBurgerSlice: makeBurgerSlice.reducer,
  userSlice: userSlice.reducer,
  feedSlice: feedSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
