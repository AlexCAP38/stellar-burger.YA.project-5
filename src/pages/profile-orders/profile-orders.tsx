import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { getUser } from '../../services/reducers/user/slice';
import { fetchOrderUser } from '../../services/reducers/user/actions/fetchOrderUser';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrderUser()); //получаем информацию ордеров у пользователя
  }, []);

  const { orderUser: orders } = useSelector(getUser);
  return <ProfileOrdersUI orders={orders} />;
};
