import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IProduct } from '../product-list/component/pruduct-interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart-shopping',
  templateUrl: './cart-shopping.component.html',
  styleUrls: ['./cart-shopping.component.css'],
  standalone: false,
})
export class CartShoppingComponent {
  products$: Observable<IProduct[]>;

  constructor(private store: Store<{ products: IProduct[] }>) {
    this.products$ = this.store.select((state) => state.products);
    console.log(this.products$);
  }
}
