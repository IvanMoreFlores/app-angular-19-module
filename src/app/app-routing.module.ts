import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ProductListComponent } from './home/product-list/list.component';
import { CartShoppingComponent } from './home/cart-shopping/cart-shopping.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'list-products', component: ProductListComponent },
  { path: 'cart-shopping', component: CartShoppingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
