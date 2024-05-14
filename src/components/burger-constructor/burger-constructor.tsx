import { FC, useMemo, useEffect } from 'react';
import { TConstructorIngredient, TOrder } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import {
  getConstructor,
  closeOrder
} from '../../services/reducers/constructorBurger/slice';
import { getUser } from '../../services/reducers/user/slice';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { fetchOrder } from '../../services/reducers/constructorBurger/actions/fetchOrder';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { constructorItems, orderRequest, orderModalData } =
    useSelector(getConstructor);
  const { isAuthorization } = useSelector(getUser);

  //Оформить заказ
  const onOrderClick = () => {
    //проверяем авторизацию пользователя
    if (!isAuthorization)
      return navigate('/login', { state: { pathname: location.pathname } });

    //проверяем наличие ингредиентов
    if (constructorItems.bun) {
      //Формируем заказ из ID
      const orderId = constructorItems.ingredients.reduce<string[]>(
        (result, item: TConstructorIngredient) => [...result, item._id],
        []
      );
      orderId.unshift(constructorItems.bun._id);
      orderId.push(constructorItems.bun._id);

      //отправляем заказ
      dispatch(fetchOrder(orderId));
    }
  };

  //Закрытие модалки Заказа
  const closeOrderModal = () => {
    dispatch(closeOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
