import { createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';

export const fetchOrder = createAsyncThunk(
  'POST_ORDER', //название экшена
  async (data: string[]) => orderBurgerApi(data)
);
