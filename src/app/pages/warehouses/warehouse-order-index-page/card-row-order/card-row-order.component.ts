import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderOrderStatusComponent } from "../header-order-status/header-order-status.component";
import { CardAddressComponent } from "../../../../auth/shared/order/card-address/card-address.component";
import { CommonModule } from '@angular/common';
import { PipesModule } from '../../../../shared/pipes.module';

@Component({
  selector: 'app-card-row-order',
  standalone: true,
  imports: [RouterModule, HeaderOrderStatusComponent, CardAddressComponent, CommonModule, PipesModule],
  templateUrl: './card-row-order.component.html',
  styleUrl: './card-row-order.component.css'
})
export class CardRowOrderComponent {

  @Input() order: any; 
  @Input() store: string = ""; 
  @Input() warehouse_id: number = 0; 
  

}
