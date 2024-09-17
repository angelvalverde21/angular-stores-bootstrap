import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ColorSizeComponent } from '../../../../../shared/color-size/color-size.component';
import { ProductService } from '../../../../../../services/product.service';
import { TableProductsInventoryComponent } from "../../../../../shared/table-products-inventory/table-products-inventory.component";
import { LoadingComponent } from "../../../../../../components/loading/loading.component";

@Component({
  selector: 'app-inventory-index',
  standalone: true,
  imports: [CommonModule, ColorSizeComponent, TableProductsInventoryComponent, LoadingComponent],
  templateUrl: './inventory-index.component.html',
  styleUrl: './inventory-index.component.css'
})
export class InventoryIndexComponent {
  
  private InventorySubscription!: Subscription; 

  products: any;
  warehouse_id: any;
  loading: boolean = true;

  constructor(
    private _products: ProductService, 
    private _route: ActivatedRoute){

  }

  ngOnInit(): void {
  
    this.loading = true;
    // Escuchar los parámetros del nivel actual de la ruta
    this._route.parent?.paramMap.subscribe(params => {
      console.log('Parámetros en el primer hijo de la ruta actual:', params.keys); // Aquí debería obtener los parámetros de las rutas hijas
      this.warehouse_id = params.get('warehouse_id');
      console.log(this.warehouse_id);
      this.InventorySubscription = this._products.all().subscribe((resp: any) => {
        this.loading = false;
        this.products = resp.data;
      });
    });
  }
}
