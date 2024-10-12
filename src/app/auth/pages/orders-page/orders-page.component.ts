import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from '../../../services/order.service';
import { HeaderComponent } from '../../../header/header.component';
import { LoadingCenterComponent } from '../../../components/loading-center/loading-center.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [HeaderComponent, LoadingCenterComponent, CommonModule],
  templateUrl: './orders-page.component.html',
  styleUrl: './orders-page.component.css'
})
export class OrdersPageComponent implements OnInit, OnDestroy {

  orders: any;
  orderSubcription!: Subscription;
  loading: boolean = true;
  constructor(
    private _order: OrderService
  ){

  }

  ngOnInit(): void {
    console.log("empieza la subscripcion");
    
    this.orderSubcription = this._order.all().subscribe((resp:any) => {
      this.orders = resp.data;
      console.log(resp);
      
      this.loading = false;
      console.log("Termina la subscripcion");
    });
  }

  ngOnDestroy(): void {

  }

}
