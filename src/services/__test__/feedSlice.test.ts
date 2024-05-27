import { initialState, fetchFeeds, feedSlice } from '../reducers/feed';

describe('Проверка среза userSlice', () => {
  describe('санка Получение Ленты заказов', () => {
    it('При обработке fetchFeeds.pending устанавливается флаг загрузки', () => {
      const tempState = {
        ...initialState
      };

      const state = feedSlice.reducer(tempState, fetchFeeds.pending(''));

      expect(state.loading).toBeTruthy(); // Проверяем, что флаг загрузки установлен
      expect(state.error).toBeNull(); // Проверяем, что сообщение об ошибке отсутствует
    });

    it('При обработке fetchFeeds.fulfilled данные ленты заказов корректно записываются в хранилище', () => {
      const order = {
        _id: 'string',
        status: 'string',
        name: 'string',
        createdAt: 'string',
        updatedAt: 'string',
        number: 666,
        ingredients: ['tghghg']
      };

      const feedsResponse = {
        success: true,
        orders: [order],
        total: 3,
        totalToday: 2
      };

      const tempState = {
        ...initialState,
        loading: true // Устанавливаем флаг загрузки в true, чтобы проверить его сброс
      };

      const state = feedSlice.reducer(
        tempState,
        fetchFeeds.fulfilled(feedsResponse, '')
      );

      expect(state.orders).toEqual(feedsResponse.orders); // Проверяем, что данные ленты заказов записаны корректно
      expect(state.total).toEqual(feedsResponse.total); // Проверяем, что значение total записано корректно
      expect(state.totalToday).toEqual(feedsResponse.totalToday); // Проверяем, что значение totalToday записано корректно
      expect(state.loading).toBeFalsy(); // Проверяем, что флаг загрузки сброшен
      expect(state.error).toBeNull(); // Проверяем, что сообщение об ошибке отсутствует
    });

    it('При обработке fetchFeeds.rejected флаг загрузки сбрасывается, а сообщение об ошибке записывается в хранилище', () => {
      const errorMessage = 'Test Error';
      const tempState = {
        ...initialState,
        loading: true // Устанавливаем флаг загрузки в true, чтобы проверить его сброс
      };

      const state = feedSlice.reducer(
        tempState,
        fetchFeeds.rejected(new Error(errorMessage), '')
      );

      expect(state.loading).toBeFalsy(); // Проверяем, что флаг загрузки сброшен
      expect(state.error).toEqual(errorMessage); // Проверяем, что сообщение об ошибке записано корректно
    });
  });
});
