import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { InputSearchProductComponent } from '../../product/input-search-product/input-search-product.component';
import { CartOrderComponent } from '../../../componentes/order/cart-order/cart-order.component';
import { InputGroupComponent } from '../../forms/input-group/input-group.component';
import { Subscription } from 'rxjs';
import { WarehouseOrderService } from '../../../services/warehouse-order.service';
import { CartService } from '../../../services/cart.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { StoreService } from '../../../services/store.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button-order-create-punto-venta',
  standalone: true,
  imports: [
    InputSearchProductComponent,
    CartOrderComponent,
    InputGroupComponent,
    CommonModule,
  ],
  templateUrl: './button-order-create-punto-venta.component.html',
  styleUrl: './button-order-create-punto-venta.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class ButtonOrderCreatePuntoVentaComponent implements OnInit, OnDestroy {
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

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private _cart: CartService,
    private _warehouseOrder: WarehouseOrderService,
    private router: Router,
    private _user: UserService,
    private _store: StoreService,
    private route: ActivatedRoute
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
    this.modal = this.modalService.open(content, { centered: true });
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
        this.data.items = this._cart.getItemsCartWarehouse();

        this._warehouseOrder
          .createOrderTienda(this.data, this.warehouse_id)
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

  closeModal() {
    this.modal.close();
  }

  ngOnInit(): void {
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
  }
  ngOnDestroy(): void {}
}
