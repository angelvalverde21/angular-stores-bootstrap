import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { Error404Component } from './pages/error404/error404.component';
import { OrderComponent } from './pages/order/order.component';
import { TrackingComponent } from './pages/tracking/tracking.component';
import { StoreComponent } from './store/store.component';
import { RegisterComponent } from './auth/register/register.component';

import { SearchComponent } from './pages/search/search.component';
import { DashboardComponent } from './auth/pages/dashboard/dashboard.component';
import { authGuard } from './auth.guard';
import { verifyStoreResolver } from './resolvers/verify-store.resolver';
import { AuthComponent } from './auth/auth.component';
import { ConfigComponent } from './auth/config/config.component';
import { InventoryComponent } from './auth/pages/inventory/inventory.component';
import { ShowInventoryComponent } from './auth/pages/inventory/show-inventory/show-inventory.component';
import { InventorySearchComponent } from './auth/pages/inventory/inventory-search/inventory-search.component';

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
          { path: 'inventory', component: InventoryComponent},
          { path: 'inventory/:id', component: ShowInventoryComponent},
          { path: 'search/:search', component: InventorySearchComponent},
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
