import { createAsyncThunk } from '@reduxjs/toolkit';
import { registerUserApi } from '../../../../utils/burger-api';
import { TRegisterData } from '../../../../utils/burger-api';

export const fetchNewUser = createAsyncThunk(
  'POST_NEW_USER', //название экшена
  async (data: TRegisterData) => registerUserApi(data)
);
