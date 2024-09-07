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
import { InventoryComponent } from './auth/pages/warehouses/warehouse-edit/inventory/inventory.component';
import { InventoryProductColorComponent } from './auth/pages/warehouses/warehouse-edit/inventory/inventory-product-color/inventory-product-color.component';
import { InventoryProductSizeComponent } from './auth/pages/warehouses/warehouse-edit/inventory/inventory-product-size/inventory-product-size.component';
import { InventoryProductColorSizeComponent } from './auth/pages/warehouses/warehouse-edit/inventory/inventory-product-color-size/inventory-product-color-size.component';
import { WarehousesComponent } from './auth/pages/warehouses/warehouses.component';
import { WarehouseEditComponent } from './auth/pages/warehouses/warehouse-edit/warehouse-edit.component';
import { InventoryIndexComponent } from './auth/pages/warehouses/warehouse-edit/inventory/inventory-index/inventory-index.component';
import { InventoryProductComponent } from './auth/pages/warehouses/warehouse-edit/inventory/inventory-product/inventory-product.component';
import { InventorySearchComponent } from './auth/pages/warehouses/warehouse-edit/inventory/inventory-search/inventory-search.component';

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
        path: 'auth', component: AuthComponent,canActivate: [authGuard],
        children: [
          { path: '', component: DashboardComponent},
          { path: 'orders', component: OrderComponent},
          { path: 'products', component: ProductsComponent},
          { path: 'products/:id', component: ProductEditComponent},
          { path: 'w', component: WarehousesComponent,
            children: [
              { path: ':warehouse_id', component: WarehouseEditComponent},
              { path: ':warehouse_id/options', component: InventoryProductColorComponent},
              { path: ':warehouse_id/inventory/search/:search', component: InventorySearchComponent},
              { path: ':warehouse_id/inventory', component: InventoryComponent,
                  children: [
                    { path: '', component: InventoryIndexComponent}, //Muestra todos los productos de todos los tipos
                    { path: ':product_id', component: InventoryProductComponent},
                    { path: ':product_id/colors', component: InventoryProductColorComponent},
                    { path: ':product_id/sizes', component: InventoryProductSizeComponent},
                    { path: ':product_id/color-size', component: InventoryProductColorSizeComponent }
                  ]
              },
            ]
          },

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
