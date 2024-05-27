import { createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi } from '../../../../utils/burger-api';

export const fetchOrder = createAsyncThunk(
  'POST_ORDER', //название экшена
  async (data: string[]) => orderBurgerApi(data)
);
