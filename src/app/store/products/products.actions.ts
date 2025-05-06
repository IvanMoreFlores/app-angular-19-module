import { createAction, props } from '@ngrx/store';
import { IProduct } from '../../pages/home/product-list/component/pruduct-interface';   

export const loadProducts = createAction('[Product] Load Products');
export const loadProductsSuccess = createAction(
  '[Product] Load Products Success',
  props<{ products: IProduct[] }>()
);
export const loadProductsFailure = createAction(
  '[Product] Load Products Failure',
  props<{ error: any }>()
);