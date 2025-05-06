import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IProduct } from '../product-list/component/pruduct-interface';
import { map, Observable } from 'rxjs';
import { deleteProduct } from '../../../store/cart/product.actions';

@Component({
  selector: 'app-cart-shopping',
  templateUrl: './cart-shopping.component.html',
  styleUrls: ['./cart-shopping.component.css'],
  standalone: false,
})
export class CartShoppingComponent {
  products$: Observable<IProduct[]>;
  total$: Observable<number>;

  constructor(private store: Store<{ products: IProduct[] }>) {
    this.products$ = this.store.select((state) => state.products);
    this.total$ = this.products$.pipe(
      map((products) =>
        products.reduce((acc, product) => acc + product.price, 0)
      )
    );
  }

  onClickRemove(id: number) {
    console.log('Producto eliminado:', id);
    this.store.dispatch(deleteProduct({ id: id }));
  }
}
