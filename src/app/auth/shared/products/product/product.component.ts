import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreService } from '../../../../services/store.service';
import { ButtonInventoryComponent } from "../../../../components/buttons/button-inventory/button-inventory.component";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonInventoryComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{

  public store: string = "";
  @Input() product: any; 

  constructor(private _store: StoreService) {
    
  }

  ngOnInit(): void {
    this.store = this._store.name()!;
  }
}
