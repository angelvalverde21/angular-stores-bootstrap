import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../../../../shared/pipes.module';
import { CardAddressComponent } from "../../../../auth/shared/order/card-address/card-address.component";
import { OrderService } from '../../../../services/order.service';
import { StoreService } from '../../../../services/store.service';

@Component({
  selector: 'app-table-order-index',
  standalone: true,
  imports: [RouterModule, CommonModule, PipesModule, CardAddressComponent, RouterModule],
  templateUrl: './table-order-index.component.html',
  styleUrl: './table-order-index.component.css'
})
export class TableOrderIndexComponent {

  @Input() orders: any; 
  @Input() store: string = ""; 
  @Input() warehouse_id: number = 0; 
  
  constructor(    
    private _order: OrderService,
    private _store: StoreService
  ){
    
  }

  status(order:any){
    return this._order.status(order);
  }

  warehouseName(){
    const warehouses = this._store.warehouses();
    return warehouses.find((warehouse:any) => warehouse.id == this.warehouse_id).name;
  }


}
