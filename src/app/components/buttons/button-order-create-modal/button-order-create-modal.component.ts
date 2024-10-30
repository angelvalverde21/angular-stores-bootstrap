import { Component, OnDestroy, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AddressFormComponent } from "../../address/address-form/address-form.component";
import { InputGroupComponent } from "../../forms/input-group/input-group.component";
import { ItemColorSizeIndexComponent } from "../../Order/item/item-color-size-index/item-color-size-index.component";
import { InputSearchProductComponent } from "../../product/input-search-product/input-search-product.component";
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from '../../../services/store.service';
import { UserService } from '../../../services/user.service';
import { ItemOrderCreateComponent } from "../../Order/item-order-create/item-order-create.component";
import { Subscription } from 'rxjs';
import { CartService } from '../../../services/cart.service';
import Swal from 'sweetalert2';
import { CardSummaryComponent } from "../../../auth/shared/order/card-summary/card-summary.component";
import { SummaryComponent } from "../../summary/summary.component";
import { WarehouseOrderService } from '../../../services/warehouse-order.service';
@Component({
  selector: 'app-button-order-create-modal',
  standalone: true,
  imports: [AddressFormComponent, InputGroupComponent, ItemColorSizeIndexComponent, InputSearchProductComponent, CommonModule, ItemOrderCreateComponent, SummaryComponent],
  templateUrl: './button-order-create-modal.component.html',
  styleUrl: './button-order-create-modal.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ButtonOrderCreateModalComponent implements OnInit, OnDestroy{
  //Esto va en la parte superior, en los imports
  
  product_id: number = 0;
  warehouse_id: number = 0;
  warehouseName: string = "";
  userName: string = "";
  store: string = "";
  cartItems: any = null;
  btnActive: boolean = false;
  warehouseCartSubscription! : Subscription;
  data: any = {};

	constructor(
		config: NgbModalConfig,
		private modalService: NgbModal,
    private route: ActivatedRoute,
    private _store: StoreService,
    private _user: UserService,
    private _cart: CartService,
    private _warehouseOrder: WarehouseOrderService,
    private router: Router

	) {
		// customize default values of modals used by this component tree
		config.backdrop = 'static';
		config.keyboard = false;

    this.route.parent?.params.subscribe((param:any) => {
      this.warehouse_id = param['warehouse_id'];
      this. warehouseName = this._store.warehouses().find((warehouse:any) => warehouse.id == this.warehouse_id).slug;
      this.userName = this._user.info().name;
    });

	}

  ngOnInit(): void {
    
    this.cartItems = this._cart.getItemsCartWarehouse();
    this.store = this._store.name()!;
    // this.loadWarehouseCart();
    this.warehouseCartSubscription = this._cart.getCartWarehouseObservable().subscribe ((resp:any) => {
      //Escucho si se agrego o no elementos al warehouseCartItems
      console.log(resp);
      
      this.cartItems = this._cart.getItemsCartWarehouse()!;

      if(this.cartItems.length>0){
        this.btnActive = true;
      }else{
        this.btnActive = false;
        this.cartItems = null;
      }

    });

  }

  ngOnDestroy(): void {

  } 

  openVerticallyCentered(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true, size: 'lg' }, );
  }

  showColor(event:any){
    console.log(event);
    this.product_id = event;
    
  } 

  eliminarItem(index: any) {

    console.log(index);

    // this.items = this._cart.getItems();

    if (index > -1) {
      // Verifica si el índice es válido
      console.log('item eliminado');
      // console.log(index);

      this.cartItems.splice(index, 1); // Elimina 1 elemento en la posición 'index'

      this._cart.setCartWarehouse(this.cartItems);

      this._cart.setSummary();
    }

    Swal.fire({
      icon: 'success',
      title: 'Eliminado',
      text: 'Item Eliminado correctamente',
      confirmButtonText: 'OK',
      showConfirmButton: true
    })
    
    // this.items = this._cart.getItems();
  }

  generarVentaTienda(){

    this.data.items = this._cart.getItemsCartWarehouse();
    
    this._warehouseOrder.createOrderTienda(this.data, this.warehouse_id).subscribe({
      next: (resp: any) => {
        console.log(resp);

        const arrayResp = resp.data;

        Swal.fire({
          icon: 'success',
          title: 'Correcto',
          text: 'El pedido ha sido registrado',
          confirmButtonText: 'OK',
          // showConfirmButton: false
        });

        this.router.navigate([
          '/',
          this.store,
          'warehouses',
          this.warehouse_id,
          'orders',
          arrayResp.order_id,
        ]);

      },
      error: (error: any) => {
        console.error('Ha ocurrido un error interno');
        console.error(error);
      },
    });
  }


}
