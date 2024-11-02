import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PipesModule } from '../../../../shared/pipes.module';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../../services/cart.service';
import { Subscription } from 'rxjs';
import { StoreService } from '../../../../services/store.service';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [PipesModule, CommonModule],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css'
})
export class OrderSummaryComponent implements OnInit, OnDestroy{

  @Input() order_id: number = 0; 
  @Input() is_pay: boolean = false; 
  summary: any;
  summarySubscription! : Subscription;
  items: any[] = [];

  constructor(private _cart: CartService, private _store: StoreService){

  }

  /**** ojo este el summary para una order ya generada, no es el mismo que el que esta en un cart */

  ngOnInit(): void {

    this.calcularCostos();

    this.summarySubscription =  this._cart.getSummaryObservable().subscribe((resp:any) => {
      this.calcularCostos();
    });

  }
  
  calcularCostos(){

    let order = this._store.getOrderById(this.order_id);

    this.items = order.items;

    console.log(this.items);
    

    console.log("costos pero de una orden");
    //El método reduce() es una función de los arrays en JavaScript que se utiliza para reducir un array a un único valor
    //array.reduce((accumulator, currentValue, index, array) => {
      // lógica de reducción
    //}, initialValue);
    const sub_total =  this.items.reduce((sum:number, item:any) => sum + item.price, 0); //sum:number es el acumulador
    const total =  this.items.reduce((sum:number, item:any) => sum + item.content.price, 0);
    const descuentos = sub_total - total;

    this.summary = {
      "sub_total": sub_total,
      "total_amount": total,
      "descuentos": descuentos
    }
  }

  ngOnDestroy(): void {
    if (this.summarySubscription) {
      this.summarySubscription.unsubscribe();
    }
  }
  
}
