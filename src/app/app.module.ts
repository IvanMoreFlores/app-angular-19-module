import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { counterReducer } from '../app/store/counter.reducer';
import { StoreModule } from '@ngrx/store';
import { ProductListComponent } from './home/product-list/list.component';
import { AppComponent } from './app.component';
import { CardProductComponent } from './home/product-list/component/product-card.component';
import { NavbarComponent } from './layout/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductListComponent,
    CardProductComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot({ count: counterReducer }),
  ],
  providers: [provideClientHydration(withEventReplay())],
  bootstrap: [AppComponent],
})
export class AppModule {}
