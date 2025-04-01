import { createReducer, on } from '@ngrx/store';
import { addProduct, deleteProduct } from './product.actions';
import { IProduct } from '../../pages/home/product-list/component/pruduct-interface';

export const initialState: IProduct[] = [];

export const productReducer = createReducer(
  initialState,
  on(addProduct, (state, { product }) => [...state, product]),
  on(deleteProduct, (state, { id }) =>
    state.filter((product) => product.id !== id)
  )
);

