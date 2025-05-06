import { createReducer, on } from '@ngrx/store';
import {
  loadProducts,
  loadProductsSuccess,
  loadProductsFailure,
} from './products.actions';
import { IProduct } from '../../pages/home/product-list/component/pruduct-interface';

export interface State {
  products: IProduct[];
  loading: boolean;
  error: string | null;
}

export const initialState: State = {
  products: [],
  loading: false,
  error: null,
};

export const productListReducer = createReducer(
  initialState,
  on(loadProducts, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadProductsSuccess, (state, { products }) => ({
    ...state,
    loading: false,
    products,
  })),
  on(loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
