import { Routes } from '@angular/router';
import { LoginComponent } from './auth/pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { Error404Component } from './pages/error404/error404.component';
import { OrderComponent } from './pages/order/order.component';
import { TrackingComponent } from './pages/tracking/tracking.component';
import { StoreComponent } from './store/store.component';
import { RegisterComponent } from './auth/pages/register/register.component';

import { SearchComponent } from './pages/search/search.component';
import { DashboardComponent } from './auth/pages/dashboard/dashboard.component';
import { authGuard } from './auth.guard';
import { AuthComponent } from './auth/auth.component';
import { ConfigComponent } from './auth/config/config.component';
import { ProductSearchComponent } from './auth/pages/product-search/product-search.component';
import { ProductsComponent } from './auth/pages/products/products.component';
import { ProductEditComponent } from './auth/pages/products/product-edit/product-edit.component';

// import { StoreNameGuard } from './guards/store-name.guard';

export const routes: Routes = [

  { path: 'error-404',component: Error404Component,title: 'Error 404 | Pagina no encontrada' },
  { path: 'register', component: RegisterComponent },

  {
    path: ':store',
    component: StoreComponent,
    // resolve: {
    //   slugBase: verifyStoreResolver
    // },
    children: [

      { path: '', component: HomeComponent },
      { path: 'search/:search', component: SearchComponent },
      { path: 'tracking', component: TrackingComponent},
      { path: 'login', component: LoginComponent },
      {
        path: 'auth', component: AuthComponent, 
        canActivate: [authGuard],
        children: [
          { path: '', component: DashboardComponent},
          { path: 'orders', component: OrderComponent},
          { path: 'products', component: ProductsComponent},
          { path: 'products/:id', component: ProductEditComponent},
          { path: 'search/:search', component: ProductSearchComponent},
          { path: 'config', component: ConfigComponent },
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
