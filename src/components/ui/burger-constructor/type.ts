import { TOrder } from '@utils-types';
import { TIngredient } from '@utils-types';
import { TConstructorIngredient } from '@utils-types';

interface TConsturctor {
  bun: TIngredient | undefined;
  ingredients: Array<TConstructorIngredient> | [];
}

export type BurgerConstructorUIProps = {
  constructorItems: TConsturctor;
  orderRequest: boolean;
  price: number;
  orderModalData: TOrder | null;
  onOrderClick: () => void;
  closeOrderModal: () => void;
};
