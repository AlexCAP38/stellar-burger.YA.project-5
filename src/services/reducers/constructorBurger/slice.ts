import {
  TOrder,
  TIngredient,
  TConstructorIngredient
} from '../../../utils/types';
import { PayloadAction, createSlice, current } from '@reduxjs/toolkit';
import { fetchOrder } from './actions';
import { moveIngredient, Direction } from '../../../utils/utils';

interface IConstructor {
  constructorItems: {
    bun: TIngredient | undefined;
    ingredients: Array<TConstructorIngredient> | [];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
}

const initialState: IConstructor = {
  constructorItems: {
    bun: undefined,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null
};

//** Конструктор бургера для заказа */
export const makeBurgerSlice = createSlice({
  name: 'makeBurgerSlice',
  initialState,
  reducers: {
    //добавляем ингредиент в конструктор
    addIngredient: (
      state,
      action: PayloadAction<TIngredient | TConstructorIngredient>
    ) => {
      //если элемент булка добавляем его в BUN
      if (action.payload.type === 'bun') {
        return {
          ...state,
          constructorItems: {
            ...state.constructorItems,
            bun: action.payload
          }
        };
      } else {
        //Все остальные ингредиенты идут в начинку
        //Предварительно модифицируем элемент добавив в него доп. ID
        const newActionPayload = {
          ...action.payload,
          id: `${Math.floor(Math.random() * 1000)}`
        };

        return {
          ...state,
          constructorItems: {
            ...state.constructorItems,
            ingredients: [
              ...state.constructorItems.ingredients,
              newActionPayload
            ]
          }
        };
      }
    },
    //удаляем из конструктора
    delIngredient: (state, action: PayloadAction<TConstructorIngredient>) => ({
      ...state,
      constructorItems: {
        ...state.constructorItems,
        ingredients: state.constructorItems.ingredients.filter(
          (item) => item.id !== action.payload.id
        )
      }
    }),
    moveDownIngredient: (state, action) => ({
      ...state,
      constructorItems: {
        ...state.constructorItems,
        ingredients: moveIngredient(
          state.constructorItems.ingredients,
          action,
          Direction.Down
        )
      }
    }),

    moveUpIngredient: (state, action) => ({
      ...state,
      constructorItems: {
        ...state.constructorItems,
        ingredients: moveIngredient(
          state.constructorItems.ingredients,
          action,
          Direction.Up
        )
      }
    }),

    //Закрытие окна заказа
    closeOrder: (state) =>
      // return { ...state, orderRequest: false, orderModalData: null };
      //Сбрасываем конструктор на первоначальное состояние
      initialState
  },
  extraReducers: (builder) => {
    builder
      //Отправляем заказ
      .addCase(fetchOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.orderRequest = false;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.orderModalData = action.payload.order;
        state.orderRequest = false;
      });
  },
  selectors: {
    getConstructor: (state) => state
  }
});

export const {
  addIngredient,
  delIngredient,
  moveDownIngredient,
  moveUpIngredient,
  closeOrder
} = makeBurgerSlice.actions;
export const { getConstructor } = makeBurgerSlice.selectors;
