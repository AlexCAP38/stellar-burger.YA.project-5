import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '../../../../utils/burger-api';

export const fetchFeeds = createAsyncThunk(
  'GET_FEEDS', //название экшена
  async () => getFeedsApi()
);
