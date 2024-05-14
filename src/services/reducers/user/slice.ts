import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  fetchLoginUser,
  fetchNewUser,
  fetchLogout,
  fetchUpdateUser,
  fetchUser,
  fetchOrderUser
} from './actions';
import { setCookie, deleteCookie } from '../../../utils/cookie';

const initialState: TUser = {
  name: '',
  email: '',
  // прогресс загрузки
  loading: false,
  //пользователь авторизовался
  isAuthorization: false,
  error: '',
  //Заказы пользователя
  orderUser: []
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    clearError: (state) => ({ ...state, error: '' })
  },
  selectors: {
    getUser: (store) => store
  },
  extraReducers: (builder) => {
    builder
      //Авторизация пользователя
      .addCase(fetchLoginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLoginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || '';
      })
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        //записываем токен в куки
        setCookie('accessToken', action.payload.accessToken);

        //записывае рефреш токен в локалсторедж
        localStorage.setItem('refreshToken', action.payload.refreshToken);

        //обновляем стор
        return {
          ...state,
          name: action.payload.user.name,
          email: action.payload.user.email,
          isAuthorization: true,
          loading: false
        };
      })

      //Регистрация пользователя
      .addCase(fetchNewUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNewUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || '';
      })
      .addCase(fetchNewUser.fulfilled, (state, action) => {
        //записываем токен в куки
        setCookie('accessToken', action.payload.accessToken);

        //записывае рефреш токен в локалсторедж
        localStorage.setItem('refreshToken', action.payload.refreshToken);

        //обновляем стор
        return {
          ...state,
          name: action.payload.user.name,
          email: action.payload.user.email,
          isAuthorization: true,
          loading: false
        };
      })

      //Выход пользователя из аккаунта
      .addCase(fetchLogout.rejected, (state, action) => {
        console.log('Ошибка выполнения выхода: ' + action.error);
      })
      .addCase(fetchLogout.fulfilled, (state, action) => {
        //удаляем токен из куки
        deleteCookie('accessToken');

        //удаляем рефреш токен
        localStorage.clear();

        //обновляем стор
        return {
          ...state,
          name: '',
          email: '',
          isAuthorization: false
        };
      })

      //обновление пользователя
      .addCase(fetchUpdateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUpdateUser.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.error?.message || '';
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action) =>
        //записываем токен в куки
        // setCookie('accessToken', action.payload.accessToken);

        //записывае рефреш токен в локалсторедж
        // localStorage.setItem('refreshToken', action.payload.refreshToken);

        //обновляем стор
        ({
          ...state,
          name: action.payload.user.name,
          email: action.payload.user.email,
          isAuthorization: true,
          loading: false
        })
      )

      //получение информации о пользователе
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.rejected, (state, action) =>
        // state.loading = false;
        // state.isAuthorization= false;
        ({
          name: '',
          email: '',
          // прогресс загрузки
          loading: false,
          //пользователь авторизовался
          isAuthorization: false,
          error: '',
          orderUser: []
        })
      )
      .addCase(fetchUser.fulfilled, (state, action) =>
        //записываем токен в куки
        // setCookie('accessToken', action.payload.accessToken);

        //записывае рефреш токен в локалсторедж
        // localStorage.setItem('refreshToken', action.payload.refreshToken);

        //обновляем стор
        ({
          ...state,
          name: action.payload.user.name,
          email: action.payload.user.email,
          isAuthorization: true,
          loading: false
        })
      )

      //получение ордеров пользователя
      .addCase(fetchOrderUser.pending, (state) => {
        // state.loading = true;
      })
      .addCase(fetchOrderUser.rejected, (state, action) => {
        // state.loading = false;
        // state.error = action.error?.message || '';
      })
      .addCase(fetchOrderUser.fulfilled, (state, action) =>
        //обновляем стор
        ({
          ...state,
          orderUser: action.payload
        })
      );
  }
});

export const { clearError } = userSlice.actions;
export const { getUser } = userSlice.selectors;
