import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { TableProductsInventoryComponent } from "../../../shared/table-products-inventory/table-products-inventory.component";
import { CommonModule } from '@angular/common';
// import { HeaderComponent } from "../../../../header/header.component";
// import { LoadingComponent } from "../../../../components/loading/loading.component";
// import { ButtonInventoryComponent } from "../../../../components/buttons/button-inventory/button-inventory.component";
import { LoadingCenterComponent } from "../../../../components/loading-center/loading-center.component";
import { StoreService } from '../../../../services/store.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-product-warehouse',
  standalone: true,
  imports: [TableProductsInventoryComponent, CommonModule, LoadingCenterComponent, RouterModule],
  templateUrl: './product-warehouse.component.html',
  styleUrl: './product-warehouse.component.css'
})
export class ProductWarehouseComponent implements OnInit, OnDestroy {
  private InventorySubscription!: Subscription; 

  product: any;
  warehouse_id: any;
  warehouses: any;
  product_id: any;
  loading: boolean = true;
  store: string = "";
  // private productSubscription!: Subscription; 

  componentName : string = "";
  
  constructor(
    private _products: ProductService, 
    private _store: StoreService,
    private _route: ActivatedRoute
  ){
    if(environment.showNameComponent){
      this.componentName = this.constructor.name;
    }
  }

  ngOnInit(): void {
  
    this.store = this._store.name()!;
    this.warehouses = this._store.warehouses();
    console.log(this.warehouses);
    
    // Escuchar los parámetros del nivel actual de la ruta
    this._route.paramMap.subscribe(params => {
      this.loading = true;
      console.log('Parámetros en el primer hijo de la ruta actual:', params.keys); // Aquí debería obtener los parámetros de las rutas hijas
      this.warehouse_id = params.get('warehouse_id') != null ? params.get('warehouse_id') : this.warehouses[0].id ; //coge el parametro del localStorage
      this.product_id = params.get('product_id');
      console.log(params.get('product_id'));
      console.log(this.warehouse_id);
      
      // console.log(this.warehouse_id);
      this.InventorySubscription = this._products.getByIdWarehouse(this.product_id, this.warehouse_id).subscribe((resp: any) => {
        this.loading = false;
        this.product = resp.data;
        console.log('imprimiendo productos ****************************');
        console.log(this.product);
        
      });
    });

  }

  ngOnDestroy(): void {

    if (this.InventorySubscription) {
      this.InventorySubscription.unsubscribe();
    }

  }

}
