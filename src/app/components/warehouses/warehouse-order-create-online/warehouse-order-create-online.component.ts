import { Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import { InputGroupComponent } from "../../forms/input-group/input-group.component";
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
import { ButtonPushComponent } from '../../buttons/button-push/button-push.component';
import { ButtonEnvioEsComponent } from '../../buttons/button-envio-es/button-envio-es.component';
import { CartOrderComponent } from "../../../componentes/order/cart-order/cart-order.component";
import { InputSearchProductComponent } from "../../product/input-search-product/input-search-product.component";

@Component({
  selector: 'app-warehouse-order-create-online',
  standalone: true,
  imports: [InputGroupComponent, AddressFormComponent, CommonModule, ReactiveFormsModule, SelectCustomComponent, ButtonPushComponent, ButtonEnvioEsComponent, CartOrderComponent, InputSearchProductComponent],
  templateUrl: './warehouse-order-create-online.component.html',
  styleUrl: './warehouse-order-create-online.component.css'
})
export class WarehouseOrderCreateOnlineComponent implements OnInit, OnDestroy{

  btnActive: boolean = false;
  acepta_contra_entrega: boolean = false;
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
  courier_default_id: number = 1;
  envio_es: number = 1;

  @Output() eventOrderId = new EventEmitter<number>();
  

  constructor(
    private _cart: CartService,
    private _warehouseOrder: WarehouseOrderService,
    private router: Router,
    private _user: UserService,
    private _store: StoreService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) {
    // customize default values of modals used by this component tree

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

  ngOnInit(): void {
    
    this.form = this.fb.group({
      origin_id: 4,
      courier_id: this.courier_default_id,
      delivery_method_id: 2,
      contra_entrega: 0,
      envio_es: this.envio_es,
      shipping_cost: '',
      address: [],
    });

    // console.log(this.courier_default_id);
    this.courier = this.setCourier(this.courier_default_id);

    console.log("courier default");
    console.log(this.courier);

    this.origins = this._store.origins();
    this.delivery_methods = this._store.delivery_methods();
    this.couriers = this._store.couriers();

    console.log(this.couriers);
    
    this.store = this._store.name()!;

    this.cartItems = this._cart.getItemsCartWarehouse();
    this.store = this._store.name()!;
    // this.loadWarehouseCart();

    /****** boton que activa el input para agregar productos *******/

    /**

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

    **/

    /****************************************************************/

    this.form.get('courier_id')?.valueChanges.subscribe(value => {

      console.log('Value changed:', value);

      const courier = this.setCourier(value);

      console.log(this.setCourier);
      this.courier = this.setCourier(value);
      // Aquí puedes manejar el cambio de valor

    });


  }

  setCourier(value: number){
    const couriers = this._store.couriers();
    return  couriers.find((courier:any) => courier.id == value);
  }

  ngOnDestroy(): void {

  }

  envio_gratis : boolean = false;

  generarVenta() {

    Swal.fire({
      title: 'Espere',
      text: 'Espere mientras ingresamos el pedido',
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();

        this.data = this.form.value

        // this.data = this.form.value.address;

        this.data.items = this._cart.getItemsCartWarehouse();

        console.log(this.data);
        
        this._warehouseOrder.createOrderDelivery(this.data, this.warehouse_id)
          .subscribe({
            next: (resp: any) => {
              console.log(resp);
    
              const arrayResp = resp.data;

              this.eventOrderId.emit(arrayResp.order_id);
    
              Swal.fire({
                icon: 'success',
                title: 'Correcto',
                text: 'El pedido ha sido registrado',
                confirmButtonText: 'OK',
                // showConfirmButton: false
              });

              // this.modal.close();
    
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
  
  //este forma valid viene del componente address que si todo es correcto emitara un valor que se recibira con esta funcion
  formValid(value: boolean) {

    if(this.form.valid && value){
      this.formAddressIsValid = true;
      this.btnActive = true;
    }else{
      this.formAddressIsValid = false;
      this.btnActive = false;
    }

    console.log(value);

  }

}
