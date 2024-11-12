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
import { ColorPublicPageComponent } from './pages/products/color-public-page/color-public-page.component';
import { OrderPageComponent } from './auth/pages/order-page/order-page.component';
import { OrdersPageComponent } from './auth/pages/orders-page/orders-page.component';
import { StoreSettingsComponent } from './auth/pages/store-settings/store-settings.component';
import { PageCheckoutComponent } from './pages/page-checkout/page-checkout.component';
import { AccountComponent } from './pages/account/account.component';
import { AddressIndexPageComponent } from './pages/account/addresses/address-index-page/address-index-page.component';
import { AddressShowPageComponent } from './pages/account/addresses/address-show-page/address-show-page.component';
import { AddressCreatePageComponent } from './pages/account/addresses/address-create-page/address-create-page.component';

import { WarehousesComponent } from './pages/warehouses/warehouses.component';
import { WarehouseOrderIndexPageComponent } from './pages/warehouses/warehouse-order-index-page/warehouse-order-index-page.component';
import { WarehouseShowPageComponent } from './pages/warehouses/warehouse-show-page/warehouse-show-page.component';
import { WarehouseOrderShowPageComponent } from './pages/warehouses/warehouse-order-show-page/warehouse-order-show-page.component';
import { WarehouseOrderCreateOnlinePageComponent } from './auth/pages/warehouses/warehouse-order-create-online-page/warehouse-order-create-online-page.component';

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
      { path: 'products/:product_id/colors/:color_id', component: ColorPublicPageComponent },
      { path: 'search/:search', component: SearchComponent },
      { path: 'orders/:order_id', component: OrderPageComponent, canActivate: [authGuard]},
      { path: 'checkout', component: PageCheckoutComponent},
      { path: 'login', component: LoginComponent },
      { path: 'auth', component: AuthComponent, canActivate: [authGuard],

          children: [
            { path: '', component: DashboardComponent},
            { path: 'orders', component: OrderComponent, children: [
                { path: '', component: OrdersPageComponent}, //plural
                { path: ':order_id', component: OrderPageComponent}, //singular
              ]
            },
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
          { path: 'store', component: StoreSettingsComponent, children: [
            { path: 'settings', component: StoreSettingsComponent},
          ] },
          // { path: 'store', component: DashboardComponent },
        ],

      },
      { path: 'store', component: AccountComponent },
      { path: 'warehouses', component: WarehousesComponent, children: [
          { path: ':warehouse_id', component: WarehouseShowPageComponent, children: [
            { path: 'orders', component: WarehouseOrderIndexPageComponent },
            { path: 'orders/create-online', component: WarehouseOrderCreateOnlinePageComponent },
            { path: 'orders/:order_id', component: WarehouseOrderShowPageComponent },
            // { path: 'orders/create-punto-venta', component: WarehouseOrderShowPageComponent },
          ]},
        ] 
      },
      { path: 'account', component: AccountComponent, children: [
          { path: 'addresses', component: AddressIndexPageComponent, children: [
            { path: ':address_id', component: AddressShowPageComponent},
            { path: 'create', component: AddressCreatePageComponent},
          ]},
        ]
      }
        
    ],
  },
  
  { path: '', component: RegisterComponent },
  //
  // { path: ':link', component: ShowProductComponent, title: 'Informacion del producto || ARA'},
  { path: '**', redirectTo: '/error-404', pathMatch: 'full' },
];
