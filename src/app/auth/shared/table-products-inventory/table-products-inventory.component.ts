import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreService } from '../../../services/store.service';
import { ColorSizeComponent } from "../color-size/color-size.component";
import { InventoryColorComponent } from "../inventory/inventory-color/inventory-color.component";
import { ColorComponent } from "../color/color.component";
import { InventoryColorSizeComponent } from "../inventory/inventory-color-size/inventory-color-size.component";
import { SkuWarehouseService } from '../../../services/api/sku-warehouse.service';
import { ButtonInventoryComponent } from "../../../components/buttons/button-inventory/button-inventory.component";
import { DropdownInventoryComponent } from "../../../components/bootstrap/dropdown-inventory/dropdown-inventory.component";
import { DropdownColorsComponent } from "../../../components/bootstrap/dropdown-colors/dropdown-colors.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table-products-inventory',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, ColorSizeComponent, InventoryColorComponent, ColorComponent, InventoryColorSizeComponent, ButtonInventoryComponent, DropdownInventoryComponent, DropdownColorsComponent],
  templateUrl: './table-products-inventory.component.html',
  styleUrl: './table-products-inventory.component.css'
})
export class TableProductsInventoryComponent implements OnInit {

  @Input() product: any; 
  @Input() warehouse_id: number = 0; 
  totalQuantityProduct: number = 0; 
  
  store: string = "";
  colorsFilter: any;
  searchTerm: string = '';

  constructor(private _store: StoreService, private _skuWarehouse : SkuWarehouseService){
    
  }

  ngOnInit(): void {

    this.totalQuantityProduct = this.product.sku.warehouse.pivot.quantity;
    // this.product.colors.sort((a:any, b: any) => b.sku.warehouse.pivot.quantity - a.sku.warehouse.pivot.quantity);
    this.loadColors();
    this.store = this._store.leerSlugBase()!;
  }

  loadColors(){
    this.colorsFilter = this.product.colors.sort((a:any, b: any) => b.sku.warehouse.pivot.quantity - a.sku.warehouse.pivot.quantity);
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

  deleteSearch(){
    this.searchTerm = "";
    this.loadColors();
  }

  filterItems() {
    this.colorsFilter = this.product.colors.filter((color:any) => 
      color.name?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  
}
