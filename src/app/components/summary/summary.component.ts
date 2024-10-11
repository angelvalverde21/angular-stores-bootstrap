import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { PipesModule } from '../../shared/pipes.module';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [PipesModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css'
})
export class SummaryComponent implements OnInit, OnDestroy {

  summarySubscription! : Subscription;
  summary: any[] = [];
  items: any;
  subAmount: number = 0;
  totalAmount: number = 0;
  igv: number = 0;

  constructor(private _cart: CartService){

  }
  
  ngOnInit(): void {

    this.calculate();

    this.summarySubscription =  this._cart.getSummaryObservable().subscribe((resp:any) => {
      console.log("se escucho la subscripcion calculate");
      
      this.calculate();
    });

  }

  calculate(){

    this.subAmount = 0;
    this.totalAmount = 0;

    console.log("se ejecuto calculate");
    

    this.items = this._cart.getItems();

    this.items.forEach((item:any) => {
      this.subAmount += item.price ? item.prices[0].value : 0;

    });

    this.totalAmount = this.subAmount;
  }

  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
  }


}
