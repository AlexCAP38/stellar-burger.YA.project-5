import { TConstructorIngredient } from '@utils-types';
import { PayloadAction } from '@reduxjs/toolkit';

export enum Direction {
  Up = -1,
  Down = 1
}

export const moveIngredient = (
  items: TConstructorIngredient[],
  action: PayloadAction<TConstructorIngredient>,
  direction: Direction
): TConstructorIngredient[] => {
  const mainElement = action.payload;
  const index = items.findIndex((item) => item._id === mainElement._id);

  // Элемент не найден в массиве
  if (index === -1) {
    return items;
  }

  // Копируем массив
  const newItems = [...items];

  // Новый индекс для перемещения элемента
  const newIndex = index + direction;

  // Если новый индекс находится за пределами массива, возвращаем исходный массив
  if (newIndex < 0 || newIndex >= items.length) {
    return items;
  }

  // Перемещаем элемент на новую позицию
  [newItems[index], newItems[newIndex]] = [newItems[newIndex], newItems[index]];

  return newItems;
};
