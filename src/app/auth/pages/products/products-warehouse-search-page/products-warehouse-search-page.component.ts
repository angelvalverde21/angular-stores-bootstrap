import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from "../../../../header/header.component";
import { LoadingCenterComponent } from "../../../../components/loading-center/loading-center.component";
import { TableProductsInventoryComponent } from "../../../shared/table-products-inventory/table-products-inventory.component";
import { Subscription } from 'rxjs';
import { ProductService } from '../../../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CommonService } from '../../../../services/common.service';
import { unsubscribe } from 'diagnostics_channel';

@Component({
  selector: 'app-products-warehouse-search-page',
  standalone: true,
  imports: [HeaderComponent, LoadingCenterComponent, TableProductsInventoryComponent, CommonModule],
  templateUrl: './products-warehouse-search-page.component.html',
  styleUrl: './products-warehouse-search-page.component.css'
})
export class ProductsWarehouseSearchPageComponent  implements OnInit, OnDestroy{

  private InventorySubscription!: Subscription; 

  products: any;
  warehouse_id: any;
  loading: boolean = true;
  search: string = "";

  constructor(
    private _products: ProductService, 
    private _route: ActivatedRoute,
    private _common: CommonService
  ){}

  ngOnInit(): void {
  

    // Escuchar los parámetros del nivel actual de la ruta
    this._route.paramMap.subscribe(params => {

      console.log('iniciando busqueda en warehouse');
      this.loading = true;
      console.log('Parámetros en el primer hijo de la ruta actual:', params.keys); // Aquí debería obtener los parámetros de las rutas hijas
      this.warehouse_id = params.get('warehouse_id');
      this.search = params.get('search')!;
      console.log(this.warehouse_id);

      this.InventorySubscription = this._products.getAllWarehouseSearch(this.search, this.warehouse_id).subscribe((resp: any) => {
        
        this.loading = false;
        this.products = resp.data;
        this._common.setIconLoading(false);
        this.InventorySubscription.unsubscribe();

      });
      
    });

  }

  ngOnDestroy(): void {
    this.InventorySubscription.unsubscribe();
  }

}
