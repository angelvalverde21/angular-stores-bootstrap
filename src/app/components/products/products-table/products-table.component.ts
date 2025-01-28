import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DropdownInventoryComponent } from "../../bootstrap/dropdown-inventory/dropdown-inventory.component";
import { DropdownColorsComponent } from "../../bootstrap/dropdown-colors/dropdown-colors.component";
import { StoreService } from '../../../services/store.service';
import { ProductFilterComponent } from "../product-filter/product-filter.component";
import { FormSearchComponent } from "../../form-search/form-search.component";

@Component({
  selector: 'app-products-table',
  standalone: true,
  imports: [CommonModule, RouterModule, DropdownInventoryComponent, DropdownColorsComponent, ProductFilterComponent, FormSearchComponent],
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.css'
})
export class ProductsTableComponent {

  @Input() products: any[] = []; 
  store: string = ""; 
  
  constructor(private _store: StoreService) {
    this.store = this._store.name()!;
  }

}
