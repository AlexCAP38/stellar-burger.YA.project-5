import '../../index.css';
import styles from './app.module.css';
import { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { getCookie } from '../../utils/cookie';

//Экшен
import { fetchUser } from '../../services/reducers/user';
import { fetchIngredients } from '../../services/reducers/ingredients/actions/fetchIngredients';

//Импорт страниц
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';

//Импорт компонентов
import {
  AppHeader,
  ProtectedRoute,
  Modal,
  IngredientDetails,
  OrderInfo
} from '@components';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const backgroundLocation = location.state?.background;

  //переменная для заголовка модалки feed id
  const id = location.pathname.split('/').pop();

  useEffect(() => {
    //наполняем стор ингредиентами
    dispatch(fetchIngredients());
    // getCookie('accessToken') && dispatch(fetchUser());
    //если токен есть тогда загрузим данные
    dispatch(fetchUser());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />

      <Routes location={backgroundLocation || location}>
        {/* Корневая страница */}
        <Route path='/' element={<ConstructorPage />} />

        {/* Страница ленты */}
        <Route path='/feed' element={<Feed />} />

        {/* Прямые ссылки*/}
        {!backgroundLocation && (
          <Route path='/ingredients/:id' element={<IngredientDetails />} />
        )}
        {!backgroundLocation && (
          <Route path='/feed/:id' element={<OrderInfo />} />
        )}
        {!backgroundLocation && (
          <Route path='/profile/orders/:id' element={<OrderInfo />} />
        )}

        {/* Страница авторизации */}
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnUser>
              <Login />
            </ProtectedRoute>
          }
        />

        {/* Страница регистрации */}
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnUser>
              <Register />
            </ProtectedRoute>
          }
        />

        {/* Страница восстановления пароля */}
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnUser>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />

        {/* Страница сброса пароля */}
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnUser>
              <ResetPassword />
            </ProtectedRoute>
          }
        />

        {/* Вложенные маршруты */}
        {/* Страница профиля */}
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Страница заказа */}
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />

        {/* Страница потеряшка */}
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {/* Модалки динамические */}

      {backgroundLocation && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title='Детали ингредиента'
                onClose={() => {
                  navigate(-1);
                }}
              >
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/feed/:id'
            element={
              <Modal
                title={id ? id : ''}
                onClose={() => {
                  navigate(-1);
                }}
              >
                <OrderInfo />
              </Modal>
            }
          />

          <Route
            path='/profile/orders/:id'
            element={
              <Modal
                title={id ? id : ''}
                onClose={() => {
                  navigate(-1);
                }}
              >
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
