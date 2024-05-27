import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateUserApi, TRegisterData } from '../../../../utils/burger-api';

export const fetchUpdateUser = createAsyncThunk(
  'PATCH_UPDATE_USER', //название экшена
  async (user: TRegisterData) => updateUserApi(user)
);
