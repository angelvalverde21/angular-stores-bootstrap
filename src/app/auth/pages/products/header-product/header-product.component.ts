import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreService } from '../../../../services/store.service';
import { ButtonInventoryComponent } from "../../../../components/buttons/button-inventory/button-inventory.component";

@Component({
  selector: 'app-header-product',
  standalone: true,
  imports: [RouterModule, ButtonInventoryComponent],
  templateUrl: './header-product.component.html',
  styleUrl: './header-product.component.css'
})
export class HeaderProductComponent implements OnInit{

  store : string = "";

  constructor(private _store: StoreService){

  }

  ngOnInit(): void {
    this.store = this._store.name()!;
  }

}
