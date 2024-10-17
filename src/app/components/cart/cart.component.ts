import { Component, OnDestroy, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { PipesModule } from '../../shared/pipes.module';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterModule, CommonModule, PipesModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit, OnDestroy{

  
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
      console.log("se ejecuto la subscripcion en cart");

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

      this._cart.setSummary();
    }

    // this.items = this._cart.getItems();
  }


}
