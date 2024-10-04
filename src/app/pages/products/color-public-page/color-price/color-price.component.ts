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

  @Input() price: number = 0; 
  @Input() prices: any[] = []; 
  @Input() priceNormal: number = 0; 
  

  getPrice(){
    const price =  this.prices.find((price:any) => price.quantity == 1);
    return price.value;
  }

}
