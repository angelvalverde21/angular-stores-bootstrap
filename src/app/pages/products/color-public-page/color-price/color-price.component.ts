import { Component, Input, OnInit } from '@angular/core';
import { PipesModule } from '../../../../shared/pipes.module';

@Component({
  selector: 'app-color-price',
  standalone: true,
  imports: [PipesModule],
  templateUrl: './color-price.component.html',
  styleUrl: './color-price.component.css'
})
export class ColorPriceComponent implements OnInit{

  @Input() price: any; 
  @Input() prices: any[] = []; 
  @Input() priceNormal: number = 0; 
  
  ngOnInit(): void {

    //ojo esto no funcioan en el constructor, por lo que se tuvo que pasar al oninit
 

  }

  getPrice(){
    this.price =  this.prices.find((price:any) => price.quantity == 1);
    if (this.price != null) {
      return this.price.value;
    } else {
      return 0;
    }
    // console.log(this.price);
  }

}
