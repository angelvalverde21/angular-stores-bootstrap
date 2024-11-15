import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PipesModule } from '../../../../shared/pipes.module';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../../services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card-summary',
  standalone: true,
  imports: [PipesModule, CommonModule],
  templateUrl: './card-summary.component.html',
  styleUrl: './card-summary.component.css'
})
export class CardSummaryComponent implements OnInit, OnDestroy{

  @Input() items: any; 
  @Input() is_pay: boolean = false; 
  summary: any;
  summarySubscription! : Subscription;

  constructor(private _cart: CartService){

  }

  /**** ojo este el summary para una order ya generada, no es el mismo que el que esta en un cart */

  ngOnInit(): void {

   
    this.calcularCostos();

    this.summarySubscription =  this._cart.getSummaryObservable().subscribe((resp:any) => {
      this.calcularCostos();
    });

  }
  
  calcularCostos(){

    console.log("costos pero de una orden");

    const sub_total =  this.items.reduce((sum:number, item:any) => sum + item.price, 0);
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


