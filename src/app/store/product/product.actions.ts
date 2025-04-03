import { createAction, props } from '@ngrx/store';
import { IProduct } from '../../pages/home/product-list/component/pruduct-interface';

export const addProduct = createAction(
  '[Product] Add Product',
  props<{ product: IProduct }>()
);
export const deleteProduct = createAction(
  '[Product] Delete Product',
  props<{ id: number }>()
);

export const increaseProduct = createAction(
  '[Product] Increase Product',
  props<{ id: number }>()
);

export const decreaseProduct = createAction(
  '[Product] Decrease Product',
  props<{ id: number }>()
);
