import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from '../../../services/order.service';
import { HeaderComponent } from '../../../header/header.component';
import { LoadingCenterComponent } from '../../../components/loading-center/loading-center.component';
import { CommonModule } from '@angular/common';
import { StepperComponent } from "../../../components/stepper/stepper.component";
import { PipesModule } from '../../../shared/pipes.module';
import { RouterModule } from '@angular/router';
import { StoreService } from '../../../services/store.service';
import { CardAddressComponent } from "../../shared/order/card-address/card-address.component";
import { BreadCrumbComponent } from "../../shared/bread-crumb/bread-crumb.component";

@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [HeaderComponent, LoadingCenterComponent, CommonModule, StepperComponent, PipesModule, RouterModule, CardAddressComponent, BreadCrumbComponent],
  templateUrl: './orders-page.component.html',
  styleUrl: './orders-page.component.css'
})
export class OrdersPageComponent implements OnInit, OnDestroy {

  orders: any;
  breadCrumbs: any;
  ordersSubcription!: Subscription;
  loading: boolean = true;
  store: string = "";

  constructor(
    private _order: OrderService,
    private _store: StoreService
  ){

  }

  ngOnInit(): void {

    this.breadCrumbs = [
      {
        name: 'Orders',
        link: ['/', this.store, 'auth', 'orders'],
      }
    ];

    this.store = this._store.name()!;

    console.log("empieza la subscripcion");
    
    this.ordersSubcription = this._order.getAll().subscribe((resp:any) => {
      this.orders = resp.data;
      console.log(resp);
      
      this.loading = false;
      console.log("Termina la subscripcion");
    });
  }

  ngOnDestroy(): void {

  }

}
