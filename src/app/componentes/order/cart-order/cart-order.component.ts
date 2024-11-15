import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { StoreService } from '../../../services/store.service';
import { CartService } from '../../../services/cart.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { SummaryComponent } from "../../../components/summary/summary.component";

@Component({
  selector: 'app-cart-order',
  standalone: true,
  imports: [CommonModule, SummaryComponent],
  templateUrl: './cart-order.component.html',
  styleUrl: './cart-order.component.css'
})
export class CartOrderComponent implements OnInit{

  cartItems: any = null;
  @Input() warehouse_id:  number = 0; 
  warehouseCartSubscription! : Subscription;
  
	constructor(
    private _store: StoreService,
    private _cart: CartService,

	) {

	}

  ngOnInit(): void {
    
    this.cartItems = this._cart.getItemsCartWarehouse();
    // this.loadWarehouseCart();
    this.warehouseCartSubscription = this._cart.getCartWarehouseObservable().subscribe ((resp:any) => {
      //Escucho si se agrego o no elementos al warehouseCartItems
      console.log(resp);
      this.cartItems = this._cart.getItemsCartWarehouse()!;

    });

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
      icon: 'warning',
      title: 'Eliminado',
      text: 'Item Eliminado correctamente',
      confirmButtonText: 'OK',
      showConfirmButton: true
    })
    
    // this.items = this._cart.getItems();
  }


}
