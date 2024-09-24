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
import { ProductsComponent } from './auth/pages/products/products.component';
import { ProductsPageComponent } from './auth/pages/products/products-page/products-page.component';
import { ProductPageComponent } from './auth/pages/products/product-page/product-page.component';
import { ProductWarehousePageComponent } from './auth/pages/products/product-warehouse-page/product-warehouse-page.component';
import { ProductsWarehouseSearchPageComponent } from './auth/pages/products/products-warehouse-search-page/products-warehouse-search-page.component';
import { ProductsWarehousePageComponent } from './auth/pages/products/products-warehouse-page/products-warehouse-page.component';
import { ProductsSearchPageComponent } from './auth/pages/products/products-search-page/products-search-page.component';
import { ProductColorsPageComponent } from './auth/pages/products/product-colors-page/product-colors-page.component';
import { ProductColorsInactivePageComponent } from './auth/pages/products/product-colors-inactive-page/product-colors-inactive-page.component';
import { ProductCreatePageComponent } from './auth/pages/products/product-create-page/product-create-page.component';

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
      { path: 'products', component: HomeComponent },
      { path: 'search/:search', component: SearchComponent },
      { path: 'tracking', component: TrackingComponent},
      { path: 'login', component: LoginComponent },
      {
        /*
          store
          store/auth/products (All Warehouses)
          store/auth/products/{product_id} (All Warehouses)
          store/auth/products/warehouse/{warehouse_id} (Single Warehouse)
          store/auth/products/{product_id}/warehouse/{warehouse_id} (Single Warehouse)
        */
        path: 'auth', component: AuthComponent,canActivate: [authGuard],

        children: [
          { path: '', component: DashboardComponent},
          { path: 'orders', component: OrderComponent},
          
          { path: 'products', component: ProductsComponent, children:[
              { path: '', component: ProductsPageComponent}, //(All Products of all Warehouses)
              { path: 'create', component: ProductCreatePageComponent}, //(All Products of all Warehouses)
              { path: ':product_id', component: ProductPageComponent}, //(Single Product of all Warehouses)       
              { path: ':product_id/colors', component: ProductColorsPageComponent}, //(Single Product of all Warehouses)       
              { path: ':product_id/colors/inactive', component: ProductColorsInactivePageComponent}, //(Single Product of all Warehouses)       
              { path: 'search/:search', component: ProductsSearchPageComponent}, //(Single Product of all Warehouses)             
              { path: 'warehouse/:warehouse_id', component: ProductsWarehousePageComponent}, //(All Products of single Warehouse)           
              { path: ':product_id/warehouse/:warehouse_id', component: ProductWarehousePageComponent}, //(Single Product of single Warehouse)   
              { path: 'warehouse/:warehouse_id/search/:search', component: ProductsWarehouseSearchPageComponent},  //(Single Product of single Warehouse for search)          
          ]}, //(All Products of all Warehouses)

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
