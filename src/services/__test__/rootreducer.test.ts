import store from '../store';
import { rootReducer } from '../store';
import { initialState as initialStateUser } from '../reducers/user';
import { initialState as initialStateIngrediets } from '../reducers/ingredients';
import { initialState as initialStateConstructor } from '../reducers/constructorBurger';
import { initialState as initialStateFeed } from '../reducers/feed';

describe('Тест корневого Reducer', () => {
  it('Инициализация rootReducer', () => {
    const inititialReducerStore = store.getState();
    expect(inititialReducerStore).not.toEqual({});
  });

  it('Проверка среза ingredientsSlice', () => {
    const initialState = rootReducer(undefined, { type: '@@INIT' });
    expect(initialState.ingredientsSlice).toEqual(initialStateIngrediets);
  });

  it('Проверка среза userSlice', () => {
    const initialState = rootReducer(undefined, { type: '@@INIT' });
    expect(initialState.userSlice).toEqual(initialStateUser);
  });

  it('Проверка среза makeBurgerSlice', () => {
    const initialState = rootReducer(undefined, { type: '@@INIT' });
    expect(initialState.makeBurgerSlice).toEqual(initialStateConstructor);
  });

  it('Проверка среза feedSlice', () => {
    const initialState = rootReducer(undefined, { type: '@@INIT' });
    expect(initialState.feedSlice).toEqual(initialStateFeed);
  });
});
