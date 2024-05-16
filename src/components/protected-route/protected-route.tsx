import { ReactElement, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/store';
import { getUser } from '../../services/reducers/user/slice';
import { Preloader } from '../ui/preloader';
import { fetchUser } from '../../services/reducers/user';
import { getCookie } from '../../utils/cookie';

type ProtectedRouteProps = {
  onlyUnUser?: boolean;
  children: ReactElement;
};

// Компонент для защиты маршрутов
export const ProtectedRoute = ({
  children,
  onlyUnUser
}: ProtectedRouteProps) => {
  const { isAuthorization, loading } = useSelector(getUser);
  const location = useLocation();
  const dispatch = useDispatch();

  if (!loading) {
    return <Preloader />;
  }

  // если данных в хранилище нет и нету пропс то делаем редирект
  if (!isAuthorization && !onlyUnUser) {
    return <Navigate to='/login' replace state={{ from: location }} />;
  }

  if (isAuthorization && onlyUnUser) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate to={from} replace />;
  }

  return children;
};
