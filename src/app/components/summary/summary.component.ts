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
  costos: any; 
  igv: number = 0;

  constructor(private _cart: CartService){

  }
  
  ngOnInit(): void {

    console.log("costos");
    
    this.costos = this._cart.costos();

    this.summarySubscription =  this._cart.getSummaryObservable().subscribe((resp:any) => {
      
      console.log("se escucho la subscripcion calculate");
      
      this.costos = this._cart.costos() ;
       
    });

  }


  ngOnDestroy(): void {

    if (this.summarySubscription) {
      this.summarySubscription.unsubscribe();
    }
    // throw new Error('Method not implemented.');
  }


}
