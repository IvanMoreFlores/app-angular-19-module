import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IProduct } from '../../home/product-list/component/pruduct-interface';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: false,
})
export class NavbarComponent {
  productCount$: Observable<number>;
  name: String;
  constructor(
    private router: Router,
    private authService: AuthService, // replace with actual service for logout
    private store: Store<{ products: IProduct[] }>
  ) {
    this.productCount$ = this.store.select((state) => state.products.length);
    this.name =
      localStorage.getItem('firstName') +
      ' ' +
      localStorage.getItem('lastName');
  }

  onClickCart() {
    this.router.navigate(['/cart-shopping']);
  }

  onClickLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
