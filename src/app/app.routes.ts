import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { Error404Component } from './pages/error404/error404.component';
import { OrderComponent } from './pages/order/order.component';
import { TrackingComponent } from './pages/tracking/tracking.component';
import { StoreComponent } from './store/store.component';
import { RegisterComponent } from './auth/register/register.component';

import { SearchComponent } from './pages/search/search.component';
import { DashboardComponent } from './auth/dashboard/dashboard.component';
import { authGuard } from './auth.guard';

// import { StoreNameGuard } from './guards/store-name.guard';

export const routes: Routes = [

  { path: 'error-404',component: Error404Component,title: 'Error 404 | Pagina no encontrada' },
  { path: 'register', component: RegisterComponent },

  {
    path: ':store',
    component: StoreComponent,

    children: [

      { path: '', component: HomeComponent },
      { path: 'order', component: OrderComponent },
      { path: 'search/:search', component: SearchComponent },
      { path: 'tracking', component: TrackingComponent},
      { path: 'order', component: OrderComponent},
      { path: 'login', component: LoginComponent },

      {
        path: 'auth', component: DashboardComponent, 
        canActivate: [authGuard],
        children: [
          { path: 'ok', component: DashboardComponent },
          { path: 'dashboard', component: DashboardComponent },
        ],
      },
    ],
  },
  
  { path: '', component: RegisterComponent },
  //
  // { path: ':link', component: ShowProductComponent, title: 'Informacion del producto || ARA'},
  { path: '**', redirectTo: '/error-404', pathMatch: 'full' },
];
