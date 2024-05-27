import { fetchIngredients, ingredientsSlice } from '../reducers/ingredients';

describe('Проверка среза ingredientsSlice', () => {
  it('При вызове экшена Request переменная Loading меняется на true', () => {
    const tempTest = {
      items: [],
      loading: false,
      error: undefined
    };

    const finishTest = {
      items: [],
      loading: true,
      error: undefined
    };

    const state = ingredientsSlice.reducer(
      tempTest,
      fetchIngredients.pending('')
    );
    // expect(state.loading).toBeTruthy();
    expect(state).toEqual(finishTest);
  });

  it('При вызове экшена Failed переменная Loading меняется на true и ошибка записывается в стор', () => {
    const testError = new Error('Test Error');

    const tempState = {
      items: [],
      loading: true,
      error: undefined
    };

    const finishTest = {
      items: [],
      loading: false,
      error: 'Test Error'
    };

    const state = ingredientsSlice.reducer(
      tempState,
      fetchIngredients.rejected(testError, '')
    );

    // expect(state.loading).toBeFalsy();
    // expect(state.error).not.toBeUndefined();
    expect(state).toEqual(finishTest);
  });

  it('При вызове экшена Success переменная Loading меняется на false и данные записывается в стор', () => {
    const ingMain = {
      _id: '643d69a5c3f7b9001cfa0943',
      name: 'Соус фирменный Space Sauce',
      type: 'sauce',
      proteins: 50,
      fat: 22,
      carbohydrates: 11,
      calories: 14,
      price: 80,
      image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
      __v: 0
    };

    const tempState = {
      items: [],
      loading: true,
      error: undefined
    };

    const finishTest = {
      items: [ingMain],
      loading: false,
      error: undefined
    };

    const state = ingredientsSlice.reducer(
      tempState,
      fetchIngredients.fulfilled([ingMain], '')
    );

    // expect(state.loading).toBeFalsy();
    // expect(state.error).toBeUndefined();
    expect(state).toEqual(finishTest);
  });
});
