import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeaderComponent } from "../../../../header/header.component";
import { TableProductsInventoryComponent } from "../../../shared/table-products-inventory/table-products-inventory.component";
import { CommonModule } from '@angular/common';
import { LoadingComponent } from "../../../../components/loading/loading.component";
import { LoadingCenterComponent } from "../../../../components/loading-center/loading-center.component";
import { ButtonInventoryComponent } from "../../../../components/buttons/button-inventory/button-inventory.component";

@Component({
  selector: 'app-product-warehouse-page',
  standalone: true,
  imports: [HeaderComponent, TableProductsInventoryComponent, CommonModule, LoadingCenterComponent, ButtonInventoryComponent],
  templateUrl: './product-warehouse-page.component.html',
  styleUrl: './product-warehouse-page.component.css'
})
export class ProductWarehousePageComponent implements OnInit, OnDestroy {
  private InventorySubscription!: Subscription; 

  product: any;
  warehouse_id: any;
  product_id: any;
  loading: boolean = true;

  constructor(
    private _products: ProductService, 
    private _route: ActivatedRoute){

  }

  ngOnInit(): void {
  

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
      });
    });

  }

  ngOnDestroy(): void {
    this.InventorySubscription.unsubscribe();
  }

}
