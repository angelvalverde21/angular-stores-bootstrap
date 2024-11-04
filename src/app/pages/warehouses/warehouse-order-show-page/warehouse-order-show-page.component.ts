import { Component, Input } from '@angular/core';
import { HeaderComponent } from "../../../header/header.component";
import { LoadingCenterComponent } from "../../../components/loading-center/loading-center.component";
import { StepperComponent } from "../../../components/stepper/stepper.component";
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { StoreService } from '../../../services/store.service';
import { IzipayComponent } from '../../../auth/shared/order/izipay/izipay.component';
import { CardCourierComponent } from '../../../auth/shared/order/card-courier/card-courier.component';
import { TableItemsComponent } from '../../../auth/shared/order/table-items/table-items.component';
import { BreadCrumbComponent } from '../../../auth/shared/bread-crumb/bread-crumb.component';
import { CardSummaryComponent } from '../../../auth/shared/order/card-summary/card-summary.component';
import { WarehouseOrderService } from '../../../services/warehouse-order.service';
import { ActivatedRoute } from '@angular/router';
import { PipesModule } from '../../../shared/pipes.module';
import { CardOrderItemComponent } from "../../../auth/shared/order/card-order-item/card-order-item.component";
import { InputSearchProductComponent } from "../../../components/product/input-search-product/input-search-product.component";
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { AddressIndexComponent } from "../../../components/address/address-index/address-index.component";
import { AddressDefaultComponent } from "../../../components/address/address-default/address-default.component";

@Component({
  selector: 'app-warehouse-order-show-page',
  standalone: true,
  imports: [PipesModule, HeaderComponent, LoadingCenterComponent, StepperComponent, CommonModule, CardCourierComponent, TableItemsComponent, BreadCrumbComponent, CardSummaryComponent, IzipayComponent, CardOrderItemComponent, InputSearchProductComponent, OrderSummaryComponent, AddressIndexComponent, AddressDefaultComponent],
  templateUrl: './warehouse-order-show-page.component.html',
  styleUrl: './warehouse-order-show-page.component.css'
})
export class WarehouseOrderShowPageComponent {

  orderSubcription!: Subscription;
  warehouses: any;
  order: any;
  breadCrumbs: any;
  summary: any;
  loading: boolean = true;
  store: string = "";
  totalAmount: number = 0;
  costos : any;
  @Input() order_id: number = 0;
  warehouse_id: number = 0;

  constructor(
    private _warehouseOrder: WarehouseOrderService,
    private _store: StoreService,
    private route: ActivatedRoute
  ){

  }

  ngOnInit(): void {

    console.log("onInit");
    
  
      this.route.parent?.params.subscribe((param:any) => {

        this.warehouse_id = param['warehouse_id'];

        console.log(this.warehouse_id);
        this.warehouses = this._store.warehouses();

        this.store = this._store.name()!;

        this.getBreadCrumbs(this.order_id);

        this.loading = true;

        this.orderSubcription = this._warehouseOrder.getById(this.warehouse_id,this.order_id).subscribe((resp:any) => {

            this.order = resp.data;
            console.log("empieza la subscripcion");
            console.log(resp);
      
            this.loading = false;
 
            // console.log("Termina la subscripcion");d

        });

      });

  }

  getBreadCrumbs(order_id: number){

    this.breadCrumbs = [
      {
        name: this.warehouses.find((warehouse: any)=> warehouse.id == this.warehouse_id).slug.toUpperCase(),
        link: ['/', this.store, 'warehouses', this.warehouse_id],
      },
      {
        name: 'Orders',
        link: ['/', this.store, 'warehouses', this.warehouse_id , 'orders'],
      },
      {
        name: `#${order_id}`,
        link: '',
      },
    ];

  }

  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
    if (this.orderSubcription) {
      this.orderSubcription.unsubscribe();
    }
  }

  selectedAddress(event:any){
    console.log("mostrando informacion en el warehouseOrderPage");
    console.log(event);
  }
}
