import { createAsyncThunk } from '@reduxjs/toolkit';
import { logoutApi } from '@api';

export const fetchLogout = createAsyncThunk(
  'POST_LOGOUT', //название экшена
  async () => logoutApi()
);
