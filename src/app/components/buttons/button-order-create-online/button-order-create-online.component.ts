import { Component, Input, OnDestroy, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { InputGroupComponent } from "../../forms/input-group/input-group.component";
import { CartOrderComponent } from "../../../componentes/order/cart-order/cart-order.component";
import { InputSearchProductComponent } from "../../product/input-search-product/input-search-product.component";
import { AddressFormComponent } from "../../address/address-form/address-form.component";
import { CartService } from '../../../services/cart.service';
import { WarehouseOrderService } from '../../../services/warehouse-order.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { StoreService } from '../../../services/store.service';

@Component({
  selector: 'app-button-order-create-online',
  standalone: true,
  imports: [InputGroupComponent, CartOrderComponent, InputSearchProductComponent, AddressFormComponent],
  templateUrl: './button-order-create-online.component.html',
  styleUrl: './button-order-create-online.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ButtonOrderCreateOnlineComponent implements OnInit, OnDestroy{

  @Input() warehouse_id: number = 0; 
  data: any = {};
  store: string = '';

	constructor(
		config: NgbModalConfig,
		private modalService: NgbModal,
    private _cart: CartService,
    private _warehouseOrder: WarehouseOrderService,
    private router: Router,
    private _store: StoreService,
	) {
		// customize default values of modals used by this component tree
		config.backdrop = 'static';
		config.keyboard = false;
	}

  openVerticallyCentered(content: TemplateRef<any>) {
		this.modalService.open(content, { centered: true });
	}

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }

  generarVenta(){

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