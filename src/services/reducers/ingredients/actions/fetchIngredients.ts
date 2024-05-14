import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';

export const fetchIngredients = createAsyncThunk(
  'GET_INGREDIENTS', //название экшена
  async () => getIngredientsApi()
);
