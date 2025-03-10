import { Component, OnDestroy, OnInit } from '@angular/core';
import { TableProductsInventoryComponent } from "../../../shared/table-products-inventory/table-products-inventory.component";
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ColorSizeComponent } from '../../../shared/color-size/color-size.component';
import { LoadingComponent } from '../../../../components/loading/loading.component';
import { ProductService } from '../../../../services/product.service';
import { HeaderComponent } from "../../../../header/header.component";
import { LoadingCenterComponent } from "../../../../components/loading-center/loading-center.component";

@Component({
  selector: 'app-products-warehouse-page',
  standalone: true,
  imports: [CommonModule, ColorSizeComponent, TableProductsInventoryComponent, HeaderComponent, LoadingCenterComponent],
  templateUrl: './products-warehouse-page.component.html',
  styleUrl: './products-warehouse-page.component.css'
})
export class ProductsWarehousePageComponent implements OnInit, OnDestroy {

  private InventorySubscription!: Subscription; 

  products: any;
  warehouse_id: any;
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
      console.log(this.warehouse_id);
      this.InventorySubscription = this._products.getAllWarehouse(this.warehouse_id).subscribe((resp: any) => {
        this.loading = false;
        this.products = resp.data;
      });
    });

  }

  ngOnDestroy(): void {
    this.InventorySubscription.unsubscribe();
  }


}
