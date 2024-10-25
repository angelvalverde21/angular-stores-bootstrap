import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../../../../shared/pipes.module';
import { CardAddressComponent } from "../../../../auth/shared/order/card-address/card-address.component";

@Component({
  selector: 'app-table-order-index',
  standalone: true,
  imports: [RouterModule, CommonModule, PipesModule, CardAddressComponent],
  templateUrl: './table-order-index.component.html',
  styleUrl: './table-order-index.component.css'
})
export class TableOrderIndexComponent {

  @Input() orders: any; 
  @Input() store: string = ""; 
  @Input() warehouse_id: number = 0; 
  

}
