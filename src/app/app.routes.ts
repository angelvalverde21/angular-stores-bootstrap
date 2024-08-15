import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { Error404Component } from './pages/error404/error404.component';
import { OrderComponent } from './pages/order/order.component';
import { TrackingComponent } from './pages/tracking/tracking.component';
import { StoreComponent } from './store/store.component';
import { RegisterComponent } from './auth/register/register.component';
import { storeNameGuard } from './guards/store-name.guard';
import { SearchComponent } from './pages/search/search.component';
// import { StoreNameGuard } from './guards/store-name.guard';

export const routes: Routes = [


  {
    path: 'error-404',
    component: Error404Component,
    title: 'Error 404 | Pagina no encontrada',
  },

  { path: 'register', component: RegisterComponent },

  { path: '', component: RegisterComponent },
  
  {
    path: ':store',
    component: StoreComponent,
    // canActivate: [storeNameGuard],
    
    children: [
      {
        path: '',
        component: HomeComponent,
      },

      {
        path: 'order',
        component: OrderComponent,
      },
      {
        path: 'search/:search',
        component: SearchComponent,
        // canActivate: [storeNameGuard],
      },
    
      {
        path: 'tracking',
        component: TrackingComponent,
      },
    
      {
        path: 'order',
        component: OrderComponent,
      },
    
      {
        path: 'login',
        component: LoginComponent,
        // canActivate: [storeNameGuard],
      },
    
    ]
  },



  // 
  // { path: ':link', component: ShowProductComponent, title: 'Informacion del producto || ARA'},
  { path: '**', redirectTo: '/error-404', pathMatch: 'full' }



];
