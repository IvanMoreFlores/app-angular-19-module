import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './pages/auth/login/login.component';
import { productReducer } from './store/cart/product.reducer';
import { StoreModule } from '@ngrx/store';
import { ProductListComponent } from './pages/home/product-list/list.component';
import { AppComponent } from './app.component';
import { CardProductComponent } from './pages/home/product-list/component/product-card.component';
import { NavbarComponent } from './pages/layout/navbar/navbar.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { CartShoppingComponent } from './pages/home/cart-shopping/cart-shopping.component';
import { ButtonComponent } from './components/button/button.component';
import { ProductsEffects } from './store/products/products.effects';
import { productListReducer } from './store/products/products.reducer';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductListComponent,
    CardProductComponent,
    NavbarComponent,
    CartShoppingComponent,
    ButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot({ products: productReducer, productsLis: productListReducer }),
    EffectsModule.forRoot([ProductsEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [provideClientHydration(withEventReplay())],
  bootstrap: [AppComponent],
})
export class AppModule {}
