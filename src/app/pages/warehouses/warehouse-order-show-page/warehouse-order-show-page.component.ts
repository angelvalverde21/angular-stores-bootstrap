import { Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { HeaderComponent } from "../../../header/header.component";
import { LoadingCenterComponent } from "../../../components/loading-center/loading-center.component";
import { StepperComponent } from "../../../components/stepper/stepper.component";
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { StoreService } from '../../../services/store.service';
import { IzipayComponent } from '../../../auth/shared/order/izipay/izipay.component';
import { BreadCrumbComponent } from '../../../auth/shared/bread-crumb/bread-crumb.component';
import { WarehouseOrderService } from '../../../services/warehouse-order.service';
import { ActivatedRoute } from '@angular/router';
import { PipesModule } from '../../../shared/pipes.module';
import { CardOrderItemComponent } from "../../../auth/shared/order/card-order-item/card-order-item.component";
import { InputSearchProductComponent } from "../../../components/product/input-search-product/input-search-product.component";
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { AddressDefaultComponent } from "../../../components/address/address-default/address-default.component";
import { CourierDefaultComponent } from "../../../components/courier/courier-default/courier-default.component";
import { CartService } from '../../../services/cart.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ButtonPdfComponent } from "../../../components/buttons/button-pdf/button-pdf.component";

@Component({
  selector: 'app-warehouse-order-show-page',
  standalone: true,
  imports: [
    PipesModule, 
    HeaderComponent, 
    LoadingCenterComponent, 
    StepperComponent, 
    CommonModule, 
    BreadCrumbComponent, 
    IzipayComponent, 
    CardOrderItemComponent, 
    InputSearchProductComponent, 
    OrderSummaryComponent, 
    AddressDefaultComponent, 
    CourierDefaultComponent, 
    ButtonPdfComponent,
  ],
  templateUrl: './warehouse-order-show-page.component.html',
  styleUrl: './warehouse-order-show-page.component.css',
  encapsulation: ViewEncapsulation.None,
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
  items: any[] = [];
	isCollapsed = false;

  constructor(
    private _warehouseOrder: WarehouseOrderService,
    private _store: StoreService,
    private route: ActivatedRoute,
    private _cart: CartService,
    private modalService: NgbModal
  ){

  }

  open(content: TemplateRef<any>) {
		this.modalService.open(content, { size: 'lg' });
	}

  totalAmountUpdated(total_amount: number){
    this.order.total_amount = total_amount;
  }

  isPayUpdated(is_pay: boolean){
    this.order.is_pay = is_pay;
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

      this._warehouseOrder.getAddItemObservable().subscribe((resp:any) => {
        console.log(resp);
        //Esto se hace asi para que la primera vez que cargue no intente acceder a this.order ya que recien se esta creando y es posible que no exista aun
        if (this.order != undefined || this.order != null) {
          this.order.items.unshift(resp);
        }
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

  selectedAddress(address:any){

    console.log("mostrando informacion en el warehouseOrderPage");
    console.log(address);
    const data = {
      "address_id": address.id
    }
    this._warehouseOrder.update(data, this.order_id).subscribe((resp:any) => {
      console.log(resp.data);
      
    });

  }

  selectedCourierAddress(address:any){

    console.log("mostrando informacion en el warehouseOrderPage");
    console.log(address);
    const data = {
      "courier_address_id": address.id
    }
    this._warehouseOrder.update(data, this.order_id).subscribe((resp:any) => {
      console.log(resp.data);
      
    });

  }

  elementoEliminado(item_id : number){

    console.log(item_id);
    

    this.order.items = this.order.items.filter((item:any) => item.id !== item_id);
    console.log(this.order.items);
    console.log("se esuch a un eliminado");
    
    this._cart.setSummary();

  }
}
