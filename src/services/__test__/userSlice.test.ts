import {
  initialState,
  fetchLoginUser,
  fetchNewUser,
  fetchLogout,
  fetchUpdateUser,
  fetchUser,
  fetchOrderUser,
  userSlice
} from '../reducers/user';
import * as cookieUtils from '../../utils/cookie';

describe('Проверка среза userSlice', () => {
  beforeEach(() => {
    global.localStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
      length: 0,
      key: jest.fn()
    };

    jest.mock('../../utils/cookie');
  });

  describe('санка Авторизация пользователя', () => {
    it('При вызове fetchLoginUser.rejected в стор записывается ошибка', () => {
      const testError = new Error('Test Error');

      const loginData = {
        email: 'fake@test.ru',
        password: '111'
      };

      const tempState = {
        ...initialState
      };

      const finishTest = {
        ...initialState,
        error: 'Test Error'
      };

      const state = userSlice.reducer(
        tempState,
        fetchLoginUser.rejected(testError, '', loginData)
      );

      expect(state).toEqual(finishTest);
    });

    it('При вызове fetchLoginUser.fulfilled в стор записывается данные пользователя', () => {
      const mockSetCookie = jest
        .spyOn(cookieUtils, 'setCookie')
        .mockImplementation(() => {});
      const mockLocalStorageSetItem = jest
        .spyOn(localStorage, 'setItem')
        .mockImplementation(() => {});

      const answerData = {
        success: true,
        refreshToken: '11111111111111111',
        accessToken: '2222222222222222',
        user: {
          name: 'Test',
          email: 'fake@test.ru',
          loading: false,
          isAuthorization: true,
          error: '',
          orderUser: []
        }
      };

      const loginData = {
        email: 'fake@test.ru',
        password: '111'
      };

      const tempState = {
        ...initialState
      };

      const finishTest = {
        ...initialState,
        name: 'Test',
        email: 'fake@test.ru',
        isAuthorization: true,
        loading: true
      };

      const state = userSlice.reducer(
        tempState,
        fetchLoginUser.fulfilled(answerData, '', loginData)
      );

      expect(mockSetCookie).toHaveBeenCalled();

      //проверим что была вызвана
      expect(mockLocalStorageSetItem).toHaveBeenCalled();

      //проверим сравним стайт
      expect(state).toEqual(finishTest);
    });
  });

  describe('санка Регистрация пользователя', () => {
    it('При вызове fetchNewUser.rejected в стор записывается ошибка', () => {
      const testError = new Error('Test Error');

      const registerData = {
        email: 'fake@test.ru',
        name: 'Test',
        password: '111'
      };

      const tempState = {
        ...initialState
      };

      const finishTest = {
        ...initialState,
        error: 'Test Error'
      };

      const state = userSlice.reducer(
        tempState,
        fetchNewUser.rejected(testError, '', registerData)
      );

      expect(state).toEqual(finishTest);
    });

    it('При вызове fetchNewUser.fulfilled в стор записывается данные пользователя', () => {
      const mockSetCookie = jest
        .spyOn(cookieUtils, 'setCookie')
        .mockImplementation(() => {});
      const mockLocalStorageSetItem = jest
        .spyOn(localStorage, 'setItem')
        .mockImplementation(() => {});

      const answerData = {
        success: true,
        refreshToken: '11111111111111111',
        accessToken: '2222222222222222',
        user: {
          name: 'Test',
          email: 'fake@test.ru',
          loading: false,
          isAuthorization: true,
          error: '',
          orderUser: []
        }
      };

      const registerData = {
        email: 'fake@test.ru',
        name: 'Test',
        password: '111'
      };

      const tempState = {
        ...initialState
      };

      const finishTest = {
        ...initialState,
        name: 'Test',
        email: 'fake@test.ru',
        isAuthorization: true,
        loading: false
      };

      const state = userSlice.reducer(
        tempState,
        fetchNewUser.fulfilled(answerData, '', registerData)
      );

      expect(mockSetCookie).toHaveBeenCalled();
      //проверим что была вызвана
      expect(mockLocalStorageSetItem).toHaveBeenCalled();

      //проверим сравним стайт
      expect(state).toEqual(finishTest);
    });
  });

  describe('санка Выход пользователя из аккаунта', () => {
    it('При вызове fetchLoginOut.rejected в консоль записывается ошибка', () => {
      const testError = new Error('Test Error');

      const mockConsole = jest.spyOn(console, 'log');

      const tempState = {
        ...initialState
      };
      const state = userSlice.reducer(
        tempState,
        fetchLogout.rejected(testError, '')
      );
      expect(mockConsole).toHaveBeenCalled();
    });

    it('При вызове fetchLoginOut.fulfilled в стор записывается данные пользователя', () => {
      const mockDeleteCookie = jest
        .spyOn(cookieUtils, 'deleteCookie')
        .mockImplementation(() => {});
      const mockLocalStorageClear = jest
        .spyOn(localStorage, 'clear')
        .mockImplementation(() => {});

      const answerData = {
        success: true
      };

      const tempState = {
        ...initialState,
        name: 'Test',
        email: 'fake@test.ru',
        isAuthorization: true
      };

      const finishTest = {
        ...initialState,
        name: '',
        email: '',
        isAuthorization: false
      };

      const state = userSlice.reducer(
        tempState,
        fetchLogout.fulfilled(answerData, '')
      );

      expect(mockDeleteCookie).toHaveBeenCalled();

      //проверим что была вызвана
      expect(mockLocalStorageClear).toHaveBeenCalled();

      //проверим сравним стайт
      expect(state).toEqual(finishTest);
    });
  });

  describe('санка Обновление пользователя', () => {
    it('При вызове fetchUpdateUser.pending переменная Loading меняется на true', () => {
      const userData = {
        name: 'Test',
        email: 'fake@test.ru',
        password: '111'
      };

      const tempState = {
        ...initialState
      };

      const state = userSlice.reducer(
        tempState,
        fetchUpdateUser.pending('', userData)
      );

      expect(state.loading).toBeFalsy();
    });

    it('При обработке fetchUpdateUser.fulfilled данные пользователя обновляются в сторе', () => {
      const userData = {
        name: 'Test',
        email: 'fake@test.ru',
        password: '111'
      };

      const answerData = {
        success: true,
        refreshToken: '11111111111111111',
        accessToken: '2222222222222222',
        user: {
          name: 'Test',
          email: 'fake@test.ru',
          loading: false,
          isAuthorization: true,
          error: '',
          orderUser: []
        }
      };

      const tempState = {
        ...initialState
      };

      const state = userSlice.reducer(
        tempState,
        fetchUpdateUser.fulfilled(answerData, '', userData)
      );

      expect(state.name).toBe('Test'); // Проверяем, что имя пользователя обновлено
      expect(state.email).toBe('fake@test.ru'); // Проверяем, что email пользователя обновлен
      expect(state.isAuthorization).toBeTruthy(); // Проверяем, что isAuthorization установлен в true
      expect(state.loading).toBeFalsy(); // Проверяем, что loading установлен в false
    });
  });

  describe('санка Получение информации о пользователе', () => {
    it('При обработке fetchUser.rejected состояние пользователя сбрасывается к начальному', () => {
      const state = userSlice.reducer(
        initialState,
        fetchUser.rejected(new Error('Test Error'), '')
      );

      expect(state.name).toBe(''); // Проверяем, что имя пользователя сброшено
      expect(state.email).toBe(''); // Проверяем, что email пользователя сброшен
      expect(state.loading).toBeTruthy(); // Проверяем, что loading установлен в true
      expect(state.isAuthorization).toBeFalsy(); // Проверяем, что isAuthorization установлен в false
      expect(state.error).toBe(''); // Проверяем, что ошибка сброшена
      expect(state.orderUser).toHaveLength(0); // Проверяем, что список заказов очищен
    });

    it('При обработке fetchUser.fulfilled данные пользователя записываются в хранилище', () => {
      const answerData = {
        success: true,
        refreshToken: '11111111111111111',
        accessToken: '2222222222222222',
        user: {
          name: 'New Name',
          email: 'newemail@test.ru',
          loading: false,
          isAuthorization: true,
          error: '',
          orderUser: []
        }
      };

      const tempState = {
        ...initialState
      };

      const state = userSlice.reducer(
        tempState,
        fetchUser.fulfilled(answerData, '')
      );

      expect(state.name).toBe('New Name'); // Проверяем, что имя пользователя обновлено
      expect(state.email).toBe('newemail@test.ru'); // Проверяем, что email пользователя обновлен
      expect(state.isAuthorization).toBeTruthy(); // Проверяем, что isAuthorization установлен в true
      expect(state.loading).toBeTruthy(); // Проверяем, что loading установлен в true
    });
  });

  describe('санка Получение ордеров пользователя', () => {
    it('При обработке fetchOrderUser.fulfilled данные ордеров пользователя записываются в хранилище', () => {
      const order = {
        _id: 'string',
        status: 'string',
        name: 'string',
        createdAt: 'string',
        updatedAt: 'string',
        number: 666,
        ingredients: ['tghghg']
      };

      const answerData = [order];

      const tempState = {
        ...initialState
      };

      const state = userSlice.reducer(
        tempState,
        fetchOrderUser.fulfilled(answerData, '')
      );

      expect(state.orderUser).toEqual(answerData); // Проверяем, что данные ордеров пользователя записаны корректно
    });
  });

  //очистка всех моков
  afterEach(() => {
    jest.clearAllMocks();
  });
});
