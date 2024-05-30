import { useDispatch, useSelector } from '../store';
import { rootReducer } from '../store';
import {
  addIngredient,
  initialState,
  makeBurgerSlice,
  delIngredient
} from '../reducers/constructorBurger';

const ingBun = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0,
  id: '111'
};

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
  __v: 0,
  id: '666'
};

describe('Проверка экшенов среза makeBurgerSlice', () => {
  it('Добавление ингредиента Булка', () => {
    const newState = makeBurgerSlice.reducer(
      initialState,
      addIngredient(ingBun)
    );
    const { constructorItems } = newState;

    expect(constructorItems).toEqual({
      bun: ingBun,
      ingredients: []
    });
  });

  it('Добавление ингредиента Начинка', () => {
    const newState = makeBurgerSlice.reducer(
      initialState,
      addIngredient(ingMain)
    );
    const {
      constructorItems: { bun, ingredients }
    } = newState;

    expect(bun).toBe(undefined);
    expect(ingredients).not.toHaveLength(0);
  });

  it('Удаление ингредиента', () => {
    const state = {
      constructorItems: {
        bun: ingBun,
        ingredients: [ingMain]
      },
      orderRequest: false,
      orderModalData: null
    };

    //удаляем начинку
    const newState = makeBurgerSlice.reducer(state, delIngredient(ingMain));

    const {
      constructorItems: { bun, ingredients }
    } = newState;

    expect(bun).toEqual(ingBun);
    expect(ingredients).toHaveLength(0);
  });
});
