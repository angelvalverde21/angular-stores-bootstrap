import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { Error404Component } from './pages/error404/error404.component';
import { OrderComponent } from './pages/order/order.component';
import { TrackingComponent } from './pages/tracking/tracking.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'order',
    component: OrderComponent,
  },
  {
    path: 'tracking',
    component: TrackingComponent,
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
