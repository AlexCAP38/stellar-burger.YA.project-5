import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginUserApi } from '@api';
import { TLoginData } from '../../../../utils/burger-api';

export const fetchLoginUser = createAsyncThunk(
  'POST_LOGIN_USER', //название экшена
  async (data: TLoginData) => loginUserApi(data)
);
