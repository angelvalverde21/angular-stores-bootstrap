import { Component } from '@angular/core';
import { WarehouseOrderCreateOnlineComponent } from "../../../../components/warehouses/warehouse-order-create-online/warehouse-order-create-online.component";
import { HeaderComponent } from "../../../../header/header.component";

@Component({
  selector: 'app-warehouse-order-create-online-page',
  standalone: true,
  imports: [WarehouseOrderCreateOnlineComponent, HeaderComponent],
  templateUrl: './warehouse-order-create-online-page.component.html',
  styleUrl: './warehouse-order-create-online-page.component.css'
})
export class WarehouseOrderCreateOnlinePageComponent {


  receiveOrderId(order_id: number){

    console.log('warehouse order page');
    console.log(order_id);
    
  }
}
