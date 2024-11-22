import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeaderComponent } from "../../../../header/header.component";
import { TableProductsInventoryComponent } from "../../../shared/table-products-inventory/table-products-inventory.component";
import { CommonModule } from '@angular/common';
import { LoadingCenterComponent } from "../../../../components/loading-center/loading-center.component";
// import { LoadingComponent } from "../../../../components/loading/loading.component";
// import { ButtonInventoryComponent } from "../../../../components/buttons/button-inventory/button-inventory.component";
// import { ProductWarehouseComponent } from "../../../shared/products/product-warehouse/product-warehouse.component";
import { StoreService } from '../../../../services/store.service';
import { BreadCrumbComponent } from "../../../shared/bread-crumb/bread-crumb.component";

@Component({
  selector: 'app-product-warehouse-page',
  standalone: true,
  imports: [HeaderComponent, TableProductsInventoryComponent, CommonModule, LoadingCenterComponent, RouterModule, BreadCrumbComponent],
  templateUrl: './product-warehouse-page.component.html',
  styleUrl: './product-warehouse-page.component.css'
})
export class ProductWarehousePageComponent implements OnInit, OnDestroy {
  private InventorySubscription!: Subscription; 

  product: any;
  warehouse_id: any;
  product_id: any;
  loading: boolean = true;
  store: string = "";
  breadCrumbs: any[] = [];

  constructor(
    private _products: ProductService, 
    private _store: StoreService,
    private _route: ActivatedRoute
  ){}

  ngOnInit(): void {
  
    this.store = this._store.name()!;

    // Escuchar los parámetros del nivel actual de la ruta
    this._route.paramMap.subscribe(params => {

      this.loading = true;
      console.log('Parámetros en el primer hijo de la ruta actual:', params.keys); // Aquí debería obtener los parámetros de las rutas hijas
      this.warehouse_id = params.get('warehouse_id');
      this.product_id = params.get('product_id');
      console.log(this.warehouse_id);
      this.InventorySubscription = this._products.getByIdWarehouse(this.product_id, this.warehouse_id).subscribe((resp: any) => {
        this.loading = false;
        this.product = resp.data;

        this.breadCrumbs = [
          {
            name: 'Products',
            link: ['/', this.store, 'auth', 'products'],
          },
          {
            name: this.product.name,
            link: ['/', this.store, 'auth', 'products',this.product.id],
          },
          {
            name: 'Stock',
            link: '',
          },
        ];

        console.log('imprimiendo productos ****************************');
        
        console.log(this.product);
        
      });
    });

  }

  ngOnDestroy(): void {
    this.InventorySubscription.unsubscribe();
  }

}
