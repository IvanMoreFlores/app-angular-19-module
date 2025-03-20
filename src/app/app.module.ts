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

@NgModule({
  declarations: [LoginComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, StoreModule.forRoot({ count: counterReducer })],
  providers: [provideClientHydration(withEventReplay())],
  bootstrap: [LoginComponent],
})
export class AppModule {}
