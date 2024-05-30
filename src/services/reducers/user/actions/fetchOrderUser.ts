import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi } from '../../../../utils/burger-api';

export const fetchOrderUser = createAsyncThunk(
  'GET_ORDER_USER', //название экшена
  async () => getOrdersApi()
);
