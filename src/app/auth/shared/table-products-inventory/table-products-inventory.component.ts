import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreService } from '../../../services/store.service';
import { ColorSizeComponent } from "../color-size/color-size.component";
import { InventoryColorComponent } from "../inventory/inventory-color/inventory-color.component";
import { ColorComponent } from "../color/color.component";
import { InventoryColorSizeComponent } from "../inventory/inventory-color-size/inventory-color-size.component";
import { SkuWarehouseService } from '../../../services/api/sku-warehouse.service';

@Component({
  selector: 'app-table-products-inventory',
  standalone: true,
  imports: [RouterModule, CommonModule, ColorSizeComponent, InventoryColorComponent, ColorComponent, InventoryColorSizeComponent],
  templateUrl: './table-products-inventory.component.html',
  styleUrl: './table-products-inventory.component.css'
})
export class TableProductsInventoryComponent implements OnInit {

  @Input() product: any; 
  @Input() warehouse_id: number = 0; 
  totalQuantityProduct: number = 0; 
  
  store: string = "";

  constructor(private _store: StoreService, private _skuWarehouse : SkuWarehouseService){
    
  }

  ngOnInit(): void {

    this.totalQuantityProduct = this.product.sku.warehouse.pivot.quantity;
    this.product.colors.sort((a:any, b: any) => b.sku.warehouse.pivot.quantity - a.sku.warehouse.pivot.quantity);
    this.store = this._store.leerSlugBase()!;
    
  }

  updateProductColor(quantity: number){

    var sku_warehouse_id = this.product.sku.warehouse.pivot.id;

    console.log('se recibio notifiacion desde el color');
    this._skuWarehouse.getBydId(sku_warehouse_id).subscribe((resp:any) => {

      // this.totalQuantityColor = Number(this.color.sku.warehouse.pivot.quantity) + Number(quantity);
      this.totalQuantityProduct = resp.data.quantity;

      // this.quantityColorUpdated.emit(quantity);
      
    });

  }
  
}
