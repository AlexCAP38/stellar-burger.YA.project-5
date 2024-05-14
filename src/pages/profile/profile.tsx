import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { getUser } from '../../services/reducers/user/slice';
import { fetchUpdateUser } from '../../services/reducers/user/actions/fetchUpdateUser';
import { fetchUser } from '../../services/reducers/user/actions/fetchUser';

export const Profile: FC = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchUser());  //получаем информацию о пользователе
  // }, []);

  const { name, email } = useSelector(getUser);

  const user = {
    name: name,
    email: email
  };

  const [formValue, setFormValue] = useState({
    name: user.name,
    email: user.email,
    password: ''
  });

  //   setFormValue({
  //   name: name,
  //   email: email,
  //   password: ''
  // })
  // useEffect(() => {
  //   setFormValue((prevState) => ({
  //     ...prevState,
  //     name: user?.name || '',
  //     email: user?.email || ''
  //   }));
  // }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  //событие обновления пользователя
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(fetchUpdateUser(formValue));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user.name,
      email: user.email,
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
