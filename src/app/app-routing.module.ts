import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { ProductListComponent } from './pages/home/product-list/list.component';
import { CartShoppingComponent } from './pages/home/cart-shopping/cart-shopping.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'list-products',
    component: ProductListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'cart-shopping',
    component: CartShoppingComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
