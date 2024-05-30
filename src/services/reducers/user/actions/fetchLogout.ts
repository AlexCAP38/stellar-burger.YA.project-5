import { createAsyncThunk } from '@reduxjs/toolkit';
import { logoutApi } from '../../../../utils/burger-api';

export const fetchLogout = createAsyncThunk(
  'USER_LOGOUT', //название экшена
  async () => logoutApi()
);
