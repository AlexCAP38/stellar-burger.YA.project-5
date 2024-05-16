import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import {
  delIngredient,
  moveDownIngredient,
  moveUpIngredient
} from '../../services/reducers/constructorBurger/slice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    //передвинуть ингредиент вниз
    const handleMoveDown = () => {
      dispatch(moveDownIngredient(ingredient));
    };

    //передвинуть ингредиент вверх
    const handleMoveUp = () => {
      dispatch(moveUpIngredient(ingredient));
    };

    //удалить ингредиент
    const handleClose = () => {
      dispatch(delIngredient(ingredient));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
