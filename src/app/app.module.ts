import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { productReducer } from '../app/store/product/product.reducer';
import { StoreModule } from '@ngrx/store';
import { ProductListComponent } from './home/product-list/list.component';
import { AppComponent } from './app.component';
import { CardProductComponent } from './home/product-list/component/product-card.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { CartShoppingComponent } from './home/cart-shopping/cart-shopping.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductListComponent,
    CardProductComponent,
    NavbarComponent,
    CartShoppingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot({ products: productReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [provideClientHydration(withEventReplay())],
  bootstrap: [AppComponent],
})
export class AppModule {}
