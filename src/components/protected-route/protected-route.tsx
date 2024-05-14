import { ReactElement, useEffect } from 'react';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/store';
import { getUser } from '../../services/reducers/user/slice';
import { Login, Register, ForgotPassword, ResetPassword } from '@pages';
import { Preloader } from '../ui/preloader';
import { fetchUser } from '../../services/reducers/user';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: ReactElement;
};

// Компонент для защиты маршрутов
export const ProtectedRoute = ({
  children,
  onlyUnAuth
}: ProtectedRouteProps) => {
  const { isAuthorization, loading } = useSelector(getUser);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchUser()); //проверим пользователя, если токен есть загрузим данные
  }, []);

  if (loading) {
    return <Preloader />;
  }

  // если данных в хранилище нет и нету пропас то делаем редирект
  if (!isAuthorization && !onlyUnAuth) {
    return <Navigate to='/login' replace state={{ from: location }} />;
  }

  if (isAuthorization && onlyUnAuth) {
    return <Navigate to='/' replace />;
  }

  return children;
};
