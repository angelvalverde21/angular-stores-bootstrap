import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from '../../../services/order.service';
import { HeaderComponent } from '../../../header/header.component';
import { LoadingCenterComponent } from '../../../components/loading-center/loading-center.component';
import { CommonModule } from '@angular/common';
import { StepperComponent } from "../../../components/stepper/stepper.component";
import { PipesModule } from '../../../shared/pipes.module';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { StoreService } from '../../../services/store.service';
import { CardAddressComponent } from '../../../auth/shared/order/card-address/card-address.component';
import { BreadCrumbComponent } from '../../../auth/shared/bread-crumb/bread-crumb.component';
import { WarehouseOrderService } from '../../../services/warehouse-order.service';
import { ButtonOrderCreateModalComponent } from "../../../components/buttons/button-order-create-modal/button-order-create-modal.component";
import { NgbAlertConfig, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-warehouse-order-index-page',
  standalone: true,
  imports: [HeaderComponent, LoadingCenterComponent, CommonModule, StepperComponent, PipesModule, RouterModule, CardAddressComponent, BreadCrumbComponent, ButtonOrderCreateModalComponent,NgbAlertModule],
  templateUrl: './warehouse-order-index-page.component.html',
  styleUrl: './warehouse-order-index-page.component.css',
  providers: [NgbAlertConfig],
})
export class WarehouseOrderIndexPageComponent implements OnInit, OnDestroy{

  orders: any;
  breadCrumbs: any;
  warehouses: any;
  ordersSubcription!: Subscription;
  loading: boolean = false;
  store: string = "";

  warehouse_id: number = 0; 
  

  constructor(

    private _store: StoreService,
    private route: ActivatedRoute,
    private _warehouseOrder: WarehouseOrderService,
    alertConfig: NgbAlertConfig
  ){
    alertConfig.type = 'success';
    alertConfig.dismissible = false;
  }

  ngOnInit(): void {

    this.route.parent?.params.subscribe((param:any) => {

      this.loading = true;

      // console.log(param['warehouse_id']);
      this.warehouse_id = param['warehouse_id'];

      this.warehouses = this._store.warehouses();

      this.breadCrumbs = [
        {
          name: this.warehouses.find((warehouse: any)=> warehouse.id == this.warehouse_id).slug.toUpperCase(),
          link: ['/', this.store, 'warehouses', this.warehouse_id],
        },
        {
          name: 'Orders',
          link: ['/', this.store, 'warehouses', this.warehouse_id , 'orders'],
        }
      ];
  
      this.store = this._store.name()!;
  
      console.log("empieza la subscripcion");

      // const warehouse_id = this.warehouse_id;
      /* ojo metemos al warehouse_id en una variable para poder usar esta sintaxios {warehouse_id} que es totalmente equivalnete a { warehouse_id: this.warehouse_id } */
      
      this.ordersSubcription = this._warehouseOrder.getAll(this.warehouse_id).subscribe((resp:any) => {

        if (resp.data.length > 0) {
          this.orders = resp.data;
        }else{
          this.orders = null;
        }


        console.log(resp);
        
        this.loading = false;
        console.log("Termina la subscripcion");
      });

    });


  }

  ngOnDestroy(): void {

  }

}
