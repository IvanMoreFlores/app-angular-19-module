import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { HomeService } from '../../pages/home/home.service';
import {
  loadProducts,
  loadProductsFailure,
  loadProductsSuccess,
} from './products.actions';

@Injectable()
export class ProductsEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly productService: HomeService
  ) {}
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      switchMap(() =>
        this.productService
          .getProducts()
          .then((response) => {
            return loadProductsSuccess({ products: response.data.products });
          })
          .catch((error) => {
            return loadProductsFailure({ error });
          })
      )
    )
  );
}
