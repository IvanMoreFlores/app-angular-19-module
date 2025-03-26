import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { increment, decrement, reset } from '../../store/counter.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false,
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  count: Observable<number>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store<{ count: number }>
  ) {
    this.count = store.select('count');
  }

  async onSubmitLogin() {
    try {
      const result = await this.authService.login(this.username, this.password);
      if (result.status === 200) {
        this.router.navigate(['/list-products']);
      }
      console.log(result.data);
      console.log(result.status);
    } catch (error) {
      this.errorMessage = 'Credenciales incorrectas';
    } finally {
      this.username = '';
      this.password = '';
    }
  }

  incrementCount() {
    this.store.dispatch(increment());
  }

  decrementCount() {
    this.store.dispatch(decrement());
  }

  resetCount() {
    this.store.dispatch(reset());
  }
}
