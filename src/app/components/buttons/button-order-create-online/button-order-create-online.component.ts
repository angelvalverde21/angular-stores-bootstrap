import { Component, Input, OnDestroy, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { InputGroupComponent } from "../../forms/input-group/input-group.component";
import { CartOrderComponent } from "../../../componentes/order/cart-order/cart-order.component";
import { InputSearchProductComponent } from "../../product/input-search-product/input-search-product.component";
import { AddressFormComponent } from "../../address/address-form/address-form.component";
import { CartService } from '../../../services/cart.service';
import { WarehouseOrderService } from '../../../services/warehouse-order.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from '../../../services/store.service';
import { Subscription } from 'rxjs';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SelectCustomComponent } from "../../select-custom/select-custom.component";
import { ButtonPushComponent } from "../button-push/button-push.component"; //Colocar esto arriba en los imports

@Component({
  selector: 'app-button-order-create-online',
  standalone: true,
  imports: [InputGroupComponent, CartOrderComponent, InputSearchProductComponent, AddressFormComponent, CommonModule, ReactiveFormsModule, SelectCustomComponent, ButtonPushComponent],
  templateUrl: './button-order-create-online.component.html',
  styleUrl: './button-order-create-online.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ButtonOrderCreateOnlineComponent implements OnInit, OnDestroy{

  modal: any;
  btnActive: boolean = false;
  warehouseCartSubscription!: Subscription;
  data: any = {};
  userName: string = '';
  store: string = '';
  warehouseName: string = '';
  warehouse_id: number = 0;
  text: string = "";
  cartItems: any = null;

  origins: any[] = [];
  delivery_methods: any[] = [];
  couriers: any[] = [];

  courier: any;
  
  acepta_contra_entrega: boolean = false;
  acepta_pago_destino: boolean = false;
  

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private _cart: CartService,
    private _warehouseOrder: WarehouseOrderService,
    private router: Router,
    private _user: UserService,
    private _store: StoreService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;

    this.userName = this._user.info().name;

    console.log(this.warehouse_id);

    this.route.parent?.params.subscribe((param: any) => {
      this.warehouse_id = param['warehouse_id'];
      console.log(this.warehouse_id);
      this.warehouseName = this._store
        .warehouses()
        .find((warehouse: any) => warehouse.id == this.warehouse_id).slug;
      this.userName = this._user.info().name;
    });

  }

  openVerticallyCentered(content: TemplateRef<any>) {
    this.modal = this.modalService.open(content, { centered: true, size: 'lg' });
  }

  ngOnInit(): void {
    
    this.form = this.fb.group({
      origin_id: 4,
      courier_id: 2,
      delivery_method_id: 1,
      envio_es: 1,
      shipping_cost: 1,
      address: [],
    });

    this.origins = this._store.origins();
    this.delivery_methods = this._store.delivery_methods();
    this.couriers = this._store.couriers();

    console.log(this.couriers);
    
    this.store = this._store.name()!;

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

    this.form.get('courier_id')?.valueChanges.subscribe(value => {
      console.log('Value changed:', value);
      const couriers = this._store.couriers();
      this.courier = couriers.find((courier:any) => courier.id == value);
      console.log(this.courier);
      this.acepta_pago_destino = this.courier.acepta_pago_destino;
      this.acepta_contra_entrega = this.courier.acepta_contra_entrega;
      // Aquí puedes manejar el cambio de valor
    });
  }

  ngOnDestroy(): void {

  }

  generarVenta() {

    Swal.fire({
      title: 'Espere',
      text: 'Espere mientras ingresamos el pedido',
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();

        this.data = this.form.value.address;

        this.data.items = this._cart.getItemsCartWarehouse();

        console.log(this.data);
        
        this._warehouseOrder.createOrderDelivery(this.data, this.warehouse_id)
          .subscribe({
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

              this.modal.close();
    
              this.router.navigate(['/',this.store,'warehouses',this.warehouse_id,'orders',arrayResp.order_id]);

              localStorage.removeItem('ItemsCartWarehouse'); //Vacia el listao de productos porque ya se realizo el pedido
              // localStorage.setItem('ItemsCartWarehouse',"");
            },
            error: (error: any) => {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ha ocurrido un error en el servidor',
              });
              
              console.error('Ha ocurrido un error interno');
              console.error(error);
            },
          });
      }
    })
  }

  formAddressIsValid: boolean = false;

  form!: FormGroup;
  
  formValid(value: boolean) {
    this.formAddressIsValid = value;
    console.log(value);
    
  }

  

}

