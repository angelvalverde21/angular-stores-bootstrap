import { Component } from '@angular/core';
import { LogoComponent } from '../../../components/logo/logo.component';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../interfaces/user.interface';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { StoreService } from '../../../services/store.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LogoComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  user!: User;
  form!: FormGroup;
  valid: boolean = true;
  loading: boolean = false;
  buttonLoginActive: boolean = true;
  message: string = '';
  web: any;

  constructor(
    private _auth: AuthService,
    public fb: FormBuilder,
    private router: Router,
    private _store: StoreService,

  ) {
    /** inicio **/

    if (this._auth.estaAutenticado()) {
      this._store.getNameObservable().subscribe((store: string) => {
        // console.log(store + ' desde header');
        this.router.navigateByUrl(store + '/auth');
      });
    }

    this.form = this.fb.group({
      email: ['', [Validators.required, this.emailOrNumberValidator]],
      password: ['', [Validators.required]],
      recuerdame: ['', false],
    });

    /** final **/
  }

  emailOrNumberValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const value = control.value ? control.value.trim() : ''; // Elimina espacios en blanco al inicio o final
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const numberPattern = /^9\d{8}$/;
  
    if (!value) {
      return null; // No hay valor, deja que el validador 'required' lo maneje
    }
  
    if (emailPattern.test(value) || numberPattern.test(value)) {
      return null; // Válido
    }
  
    console.log('Valor ingresado:', value); // Para depurar
    return { emailOrNumberInvalid: true }; // No válido
  }

  iniciarSesion() {
    this.loading = true;
    this.buttonLoginActive = false;

    this._auth.login(this.form.value).subscribe({
      next: (resp: any) => {
        // console.log(resp);

        this.loading = false;
        this.message = resp.message;
        if (resp.success) {
          // const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

          // localStorage.setItem('user',JSON.stringify(resp.user));
          // localStorage.setItem('roles',JSON.stringify(resp.user.roles));

          this.router.navigateByUrl(localStorage.getItem('slug_base') + '/auth');
          // this.router.navigate([localStorage.getItem('slug_base'), 'auth']);

        }
      },

      error: (resp: any) => {
        this.valid = false;
        this.loading = false;
        this.message = resp.error.message;
        this.buttonLoginActive = true;
        console.log(resp);
      },
      complete: () => {
        this.loading = false;
        console.log('Request complete');
      },
    });
  }

  ngOnInit() {
    this.user = new User();
    // console.log(this.route.snapshot.queryParams);
    // console.log(this.route.snapshot.fragment);
    // console.log(this.router.url);
    // this.user.email = "angelvalverde@gmail.com";
    // this.user.name = "angelvalverde@gmail.com";
    // this.user.password = "angelvalverde@gmail.com";

    //recibiendo informacion de la pagina desde el api

    // this._web.getWebObservable().subscribe((data: any) => {
    //   this.web = data;
    // });
  }
}
