import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { RegisterUI } from '@ui-pages';
import { useSelector, useDispatch } from '../../services/store';
import { getUser, clearError } from '../../services/reducers/user/slice';
import { fetchNewUser } from '../../services/reducers/user/actions/fetchNewUser';
import { useNavigate } from 'react-router-dom';
import { Preloader } from '@ui';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const { error, isAuthorization, loading } = useSelector(getUser);
  const navigate = useNavigate();

  useEffect(() => {
    isAuthorization && navigate('/');
  }, [isAuthorization]);

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(clearError());
    dispatch(fetchNewUser({ email, name: userName, password }));
  };

  if (loading) {
    return <Preloader />;
  }

  return (
    <RegisterUI
      errorText={error}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
