import { Component, Input } from '@angular/core';
import { PipesModule } from '../../../../shared/pipes.module';

@Component({
  selector: 'app-color-price',
  standalone: true,
  imports: [PipesModule],
  templateUrl: './color-price.component.html',
  styleUrl: './color-price.component.css'
})
export class ColorPriceComponent {

  @Input() price: any; 
  @Input() prices: any[] = []; 
  @Input() priceNormal: number = 0; 
  

  getPrice(){
    this.price =  this.prices.find((price:any) => price.quantity == 1);
    return this.price.value;
  }

}
