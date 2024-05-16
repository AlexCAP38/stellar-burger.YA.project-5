import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeeds } from '../../services/reducers/feed/actions/fetchFeeds';
import { getOrders } from '../../services/reducers/feed/slice';

export const Feed: FC = () => {
  const { orders } = useSelector(getOrders);
  const dispatch = useDispatch();
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [update]);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        setUpdate(!update);
      }}
    />
  );
};
