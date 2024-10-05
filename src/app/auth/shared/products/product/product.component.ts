import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreService } from '../../../../services/store.service';
import { ButtonInventoryComponent } from "../../../../components/buttons/button-inventory/button-inventory.component";
import { DropdownInventoryComponent } from "../../../../components/bootstrap/dropdown-inventory/dropdown-inventory.component";
import { DropdownComponent } from "../../../../components/bootstrap/dropdown/dropdown.component";
import { DropdownColorsComponent } from "../../../../components/bootstrap/dropdown-colors/dropdown-colors.component";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonInventoryComponent, DropdownInventoryComponent, DropdownComponent, DropdownColorsComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{

  public store: string = "";
  @Input() product: any; 
  quantityGlobalProduct: number | string = 0;

  constructor(private _store: StoreService) {
    
  }

  ngOnInit(): void {

    console.log(this.product);
    this.quantityGlobalProduct = this.product.sku? this.product.sku.quantity : "";
    this.store = this._store.name()!;
  }
}
