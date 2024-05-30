import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { fetchFeeds } from './actions/fetchFeeds';
import { TFeedsResponse } from '../../../utils/burger-api';

type TFeed = {
  orders: TOrder[] | [];
  total: number;
  totalToday: number;
  loading?: boolean;
  error?: string | null;
};

export const initialState: TFeed = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null
};

//** Хранилице сделанных заказов  полученное по АПИ */
export const feedSlice = createSlice({
  name: 'feedSlice',
  initialState,
  reducers: {},
  selectors: {
    getOrders: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(
        fetchFeeds.fulfilled,
        (state, action: PayloadAction<TFeedsResponse>) => {
          state.loading = false;
          state.orders = action.payload.orders;
          state.total = action.payload.total;
          state.totalToday = action.payload.totalToday;
        }
      );
  }
});

export const { getOrders } = feedSlice.selectors;
