import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreService } from '../../../services/store.service';
import { ColorSizeComponent } from "../color-size/color-size.component";
import { InventoryColorComponent } from "../inventory/inventory-color/inventory-color.component";

@Component({
  selector: 'app-table-products-inventory',
  standalone: true,
  imports: [RouterModule, CommonModule, ColorSizeComponent, InventoryColorComponent],
  templateUrl: './table-products-inventory.component.html',
  styleUrl: './table-products-inventory.component.css'
})
export class TableProductsInventoryComponent implements OnInit {

  @Input() product: any; 
  @Input() warehouse_id: number = 0; 
  
  store: string = "";

  constructor(private _store: StoreService){
    
  }

  ngOnInit(): void {

    this.product.colors.sort((a:any, b: any) => b.sku.warehouse.pivot.quantity - a.sku.warehouse.pivot.quantity);
    this.store = this._store.leerSlugBase()!;
  }
}
