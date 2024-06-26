import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserApi } from '../../../../utils/burger-api';

export const fetchUser = createAsyncThunk(
  'GET_USER', //название экшена
  async () => getUserApi()
);
