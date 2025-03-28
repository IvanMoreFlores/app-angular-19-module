import { createAction, props } from '@ngrx/store';
import { IProduct } from '../../home/product-list/component/pruduct-interface';

export const addProduct = createAction(
  '[Product] Add Product',
  props<{ product: IProduct }>()
);
export const deleteProduct = createAction(
  '[Product] Delete Product',
  props<{ id: number }>()
);
