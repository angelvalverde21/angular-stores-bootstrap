import { Component, OnDestroy, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css'
})
export class OrderSummaryComponent implements OnInit, OnDestroy{

  items: any;
  private itemsSubscription!: Subscription;

  constructor(
    private _store: StoreService,
    private _cart: CartService,
  ) {

  }
  ngOnDestroy(): void {
    if (this.itemsSubscription) {
      this.itemsSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.itemsSubscription = this._cart.getItemsObservable().subscribe((resp:any) => {
      
      this.items = resp;
      console.log("se ejecuto la subscripcion");

    });
  }

  deleteItem(index: any) {

    console.log(index);

    // this.items = this._cart.getItems();

    if (index > -1) {
      // Verifica si el índice es válido
      console.log('item eliminado');
      // console.log(index);

      this.items.splice(index, 1); // Elimina 1 elemento en la posición 'index'

      this._cart.setItems(this.items);
    }

    // this.items = this._cart.getItems();
  }

}
