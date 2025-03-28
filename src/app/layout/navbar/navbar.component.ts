import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IProduct } from '../../home/product-list/component/pruduct-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: false,
})
export class NavbarComponent {
  productCount$: Observable<number>;

  constructor(
    private router: Router,
    private store: Store<{ products: IProduct[] }>
  ) {
    this.productCount$ = this.store.select((state) => state.products.length);
  }

  onClickCart() {
    this.router.navigate(['/cart-shopping']);
  }
}
