import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { LoginUI } from '@ui-pages';
import { useSelector, useDispatch } from '../../services/store';
import { getUser, clearError } from '../../services/reducers/user/slice';
import { fetchLoginUser } from '../../services/reducers/user/actions/fetchLoginUser';
import { Preloader } from '@ui';
import { useNavigate, useLocation } from 'react-router-dom';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { error, loading, isAuthorization } = useSelector(getUser);

  //сбрасываем состояние ошибок
  useEffect(() => {
    dispatch(clearError());
  }, []);

  //следим за авторизацией если хомяк авторизовался перенаправим его на страницу откуда прибыл
  useEffect(() => {
    if (isAuthorization) {
      console.log(location.state?.from);

      navigate(location.state?.from?.pathname || '/');
    }
  }, [isAuthorization]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (email.length >= 5) {
      dispatch(fetchLoginUser({ email, password }));
    }
  };

  if (loading) {
    return <Preloader />;
  }

  return (
    <LoginUI
      errorText={error}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
