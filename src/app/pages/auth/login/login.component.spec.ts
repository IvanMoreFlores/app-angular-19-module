import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms'; // Necesario para usar [(ngModel)]
import { AuthService } from '../auth.service'; //Servicio que vamos a Mockear
import { Router } from '@angular/router'; // Router que vamos a simular
import { By } from '@angular/platform-browser'; // Para seleccionar elementos del DOM

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: any // Mock del servicio de autenticación
  let mockRouter: any; // Mock del router

  beforeEach(async () => {
    //Crear el mock del servicio de autenticación
    mockAuthService = {
      login: jest.fn(), // Simular el método de inicio de sesión
      isAuthenticated: jest.fn(), // Simular el método de verificación de autenticación
    };

    mockRouter = {
      navigate: jest.fn(), // Simular el método de navegación
    };

    // Configurar el TestBed
    await TestBed.configureTestingModule({
      imports: [FormsModule], // Importar FormsModule para usar [(ngModel)]
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService }, // Proveer el mock del servicio
        { provide: Router, useValue: mockRouter }, // Proveer el mock del router
      ],
    }).compileComponents();

    // Creamos una instancia del componente
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Detectar cambios para inicializar el componente
  });

  //Empezamos a escribir las pruebas

  // 1. Test: el componente debe crearse correctamente
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // 2. Test: el componente debe redirigir al usuario si ya está autenticado
  it('should redirect the user if already authenticated', () => {
    mockAuthService.isAuthenticated.mockReturnValue(true); // Simular que el usuario está autenticado
    component.ngOnInit(); // Llamar al método ngOnInit
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/list-products']); // Verificar que se redirige al usuario
  });

  // 3. Test: el componente no debe redirigir al usuario si no está autenticado
  it('should not redirect the user if not authenticated', () => {
    mockAuthService.isAuthenticated.mockReturnValue(false); // Simular que el usuario no está autenticado
    component.ngOnInit(); // Llamar al método ngOnInit
    expect(mockRouter.navigate).not.toHaveBeenCalled(); // Verificar que no se redirige al usuario
  });

  // 4. Test: el método onSubmitLogin debe llamar al servicio de autenticación
  it('should call the authService.login method', async () => {
    mockAuthService.login.mockReturnValue({
      status: 200,
      data: {},
    });
    const username = 'testuser';
    const password = 'testpassword';
    component.username = username;
    component.password = password;
    await component.onSubmitLogin();
    expect(mockAuthService.login).toHaveBeenCalledWith(username, password);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/list-products']);
  });
});
