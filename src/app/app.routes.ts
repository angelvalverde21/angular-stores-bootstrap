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
import { ProductSearchComponent } from './auth/pages/products/product-search/product-search.component';
import { ProductsComponent } from './auth/pages/products/products.component';
import { ProductEditComponent } from './auth/pages/products/product-edit/product-edit.component';
import { InventoryComponent } from './auth/pages/warehouses/warehouse-edit/inventory/inventory.component';
import { InventoryProductColorComponent } from './auth/pages/warehouses/warehouse-edit/inventory/inventory-product-color/inventory-product-color.component';
import { InventoryProductSizeComponent } from './auth/pages/warehouses/warehouse-edit/inventory/inventory-product-size/inventory-product-size.component';
import { InventoryProductColorSizeComponent } from './auth/pages/warehouses/warehouse-edit/inventory/inventory-product-color-size/inventory-product-color-size.component';
import { WarehousesComponent } from './auth/pages/warehouses/warehouses.component';
import { WarehouseEditComponent } from './auth/pages/warehouses/warehouse-edit/warehouse-edit.component';
import { InventoryIndexComponent } from './auth/pages/warehouses/warehouse-edit/inventory/inventory-index/inventory-index.component';
import { InventoryProductComponent } from './auth/pages/warehouses/warehouse-edit/inventory/inventory-product/inventory-product.component';
import { InventorySearchComponent } from './auth/pages/warehouses/warehouse-edit/inventory/inventory-search/inventory-search.component';
import { ProductComponent } from './auth/pages/products/product_back/product.component';
import { ProductsWarehouseComponent } from './auth/pages/products/products-warehouse/products-warehouse.component';
import { ProductWarehouseComponent } from './auth/pages/products/product-warehouse/product-warehouse.component';
import { ProductWarehouseSearchComponent } from './auth/pages/products/product-warehouse-search/product-warehouse-search.component';
import { ProductsPageComponent } from './auth/pages/products/products-page/products-page.component';
import { ProductPageComponent } from './auth/pages/products/product-page/product-page.component';

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
          
          { path: 'products', component: ProductsPageComponent}, //(All Products of all Warehouses)
          { path: 'products/:product_id', component: ProductPageComponent}, //(Single Product of all Warehouses)             
          { path: 'products/search/:search', component: ProductSearchComponent}, //(Single Product of all Warehouses)             
          { path: 'products/warehouse/:warehouse_id', component: ProductsWarehouseComponent}, //(All Products of single Warehouse)           
          { path: 'products/:product_id/warehouse/:warehouse_id', component: ProductWarehouseComponent}, //(Single Product of single Warehouse)   
          { path: 'products/:product_id/warehouse/:warehouse_id/search/:search', component: ProductWarehouseSearchComponent},  //(Single Product of single Warehouse for search)          
          
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
