import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
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

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/list-products']);
    }
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
      console.log(error);
    } finally {
      this.username = '';
      this.password = '';
    }
  }
}
