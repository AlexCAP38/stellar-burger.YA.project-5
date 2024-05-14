import { createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { fetchIngredients } from './actions';

interface IinitialState {
  items: Array<TIngredient>;
  loading: boolean;
  error: string | undefined;
}

const initialState: IinitialState = {
  items: [],
  loading: false,
  error: undefined
};

//** Хранилице ингредиентов полученное по АПИ */
export const ingredientsSlice = createSlice({
  name: 'ingredientsSlice',
  initialState,
  reducers: {},
  selectors: {
    getIngredients: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      });
  }
});

export const { getIngredients } = ingredientsSlice.selectors;
