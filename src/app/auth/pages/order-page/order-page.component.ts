import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from "../../../header/header.component";
import { LoadingCenterComponent } from "../../../components/loading-center/loading-center.component";
import { StepperComponent } from "../../../components/stepper/stepper.component";
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { OrderService } from '../../../services/order.service';
import { StoreService } from '../../../services/store.service';
import { CardAddressComponent } from "../../shared/order/card-address/card-address.component";
import { CardCourierComponent } from "../../shared/order/card-courier/card-courier.component";
import { TableItemsComponent } from "../../shared/order/table-items/table-items.component";
import { BreadCrumbComponent } from "../../shared/bread-crumb/bread-crumb.component";
import { CardSummaryComponent } from "../../shared/order/card-summary/card-summary.component";
import { IzipayComponent } from "../../shared/order/izipay/izipay.component";

@Component({
  selector: 'app-order-page',
  standalone: true,
  imports: [HeaderComponent, LoadingCenterComponent, StepperComponent, CommonModule, CardAddressComponent, CardCourierComponent, TableItemsComponent, BreadCrumbComponent, CardSummaryComponent, IzipayComponent],
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.css'
})
export class OrderPageComponent implements OnInit, OnDestroy{

  orderSubcription!: Subscription;

  order: any;
  breadCrumbs: any;
  summary: any;
  loading: boolean = true;
  store: string = "";
  totalAmount: number = 0;
  costos : any;
  @Input() order_id: number = 0;

  constructor(
    private _order: OrderService,
    private _store: StoreService
  ){

  }

  ngOnInit(): void {
  
    this.store = this._store.name()!;

    console.log("empieza la subscripcion");
    
    this.orderSubcription = this._order.getById(this.order_id).subscribe((resp:any) => {
      this.order = resp.data;
      console.log(resp);

      this.loading = false;

      this.breadCrumbs = [
        {
          name: 'Orders',
          link: ['/', this.store, 'auth', 'orders'],
        },
        {
          name: `#${this.order.id}`,
          link: '',
        },
      ];
      
      console.log("Termina la subscripcion");
    });
  }

  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
  }

}
