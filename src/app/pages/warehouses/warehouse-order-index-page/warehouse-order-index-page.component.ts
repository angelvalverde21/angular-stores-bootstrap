import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { HeaderComponent } from '../../../header/header.component';
import { LoadingCenterComponent } from '../../../components/loading-center/loading-center.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from '../../../services/store.service';
import { CardAddressComponent } from '../../../auth/shared/order/card-address/card-address.component';
import { BreadCrumbComponent } from '../../../auth/shared/bread-crumb/bread-crumb.component';
import { WarehouseOrderService } from '../../../services/warehouse-order.service';
import { ButtonOrderCreateModalComponent } from "../../../components/buttons/button-order-create-modal/button-order-create-modal.component";
import { NgbAccordionModule, NgbAlertConfig, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderOrderStatusComponent } from "./header-order-status/header-order-status.component";
import { CardRowOrderComponent } from "./card-row-order/card-row-order.component";
import { TableOrderIndexComponent } from "./table-order-index/table-order-index.component";
import { ButtonOrderCreatePuntoVentaComponent } from "../../../components/buttons/button-order-create-punto-venta/button-order-create-punto-venta.component";
import { ButtonOrderCreateOnlineComponent } from "../../../components/buttons/button-order-create-online/button-order-create-online.component";

@Component({
  selector: 'app-warehouse-order-index-page',
  standalone: true,
  imports: [HeaderComponent, NgbAccordionModule, LoadingCenterComponent, CommonModule, CardAddressComponent, BreadCrumbComponent, ButtonOrderCreateModalComponent, NgbAlertModule, HeaderOrderStatusComponent, CardRowOrderComponent, TableOrderIndexComponent, ButtonOrderCreatePuntoVentaComponent, ButtonOrderCreateOnlineComponent],
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
    alertConfig.type = 'warning';
    alertConfig.dismissible = false;
  }

  ngOnInit(): void {

    this.route.parent?.params.subscribe((param:any) => {


      // console.log(param['warehouse_id']);
      this.warehouse_id = param['warehouse_id'];

      this.warehouses = this._store.warehouses();

      this.store = this._store.name()!;

      this.breadCrumbs = [
        {
          name: this.warehouses.find((warehouse: any)=> warehouse.id == this.warehouse_id).slug.toUpperCase(),
          link: ['/', this.store, 'warehouses', this.warehouse_id , 'orders'],
        },
        {
          name: 'Orders',
          link: ['/', this.store, 'warehouses', this.warehouse_id , 'orders'],
        }
      ];
  
      

      this.loading = true;
  
      console.log("empieza la subscripcion");

      // const warehouse_id = this.warehouse_id;
      /* ojo metemos al warehouse_id en una variable para poder usar esta sintaxios {warehouse_id} que es totalmente equivalnete a { warehouse_id: this.warehouse_id } */
      
      this.ordersSubcription = this._warehouseOrder.getAll(this.warehouse_id).subscribe((resp:any) => {

        if (resp.data.length > 0) {
          this.orders = resp.data;
          this._store.setOrders(this.orders); //setea en el localhost
        }else{
          this.orders = null;
        }
        
        console.log(resp);
        
        this.loading = false;
        console.log("Termina la subscripcion");
      });

    });


  }

  seleccionado: string = "hoy";
  
  
  selected(value:string){
    this.seleccionado = value;
  }

  ngOnDestroy(): void {

  }



}
