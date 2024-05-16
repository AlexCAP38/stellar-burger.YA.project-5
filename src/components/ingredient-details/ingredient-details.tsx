import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { getIngredients } from '../../services/reducers/ingredients/slice';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const { items } = useSelector(getIngredients);
  const { id } = useParams();

  //Получаем из стора массив элементов сравниваем его с id URL
  const item = items.find((item) => item._id === id);

  // FIX ? Возможно лишние условие, нужно уточнить действие
  const ingredientData = item ? item : null;

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
