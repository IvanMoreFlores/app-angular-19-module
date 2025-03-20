import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppModule } from './app.module';
import { LoginComponent } from './auth/login/login.component';

@NgModule({
  imports: [AppModule, ServerModule],
  bootstrap: [LoginComponent],
})
export class AppServerModule {}
