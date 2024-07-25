import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { Error404Component } from './pages/error404/error404.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
      },
    
      { path: '', component: HomeComponent },
      // { path: ':link', component: ShowProductComponent, title: 'Informacion del producto || ARA'},
      { path: '**', redirectTo: '/error-404', pathMatch: 'full' },
    
      {
        path: 'error-404',
        component: Error404Component,
        title: 'Error 404 | Pagina no encontrada',
      },
];
