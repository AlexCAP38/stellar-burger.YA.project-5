import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../../../utils/burger-api';

export const fetchIngredients = createAsyncThunk(
  'GET_INGREDIENTS', //название экшена
  async () => getIngredientsApi()
);
