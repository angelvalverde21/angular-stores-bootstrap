import { Component, Input } from '@angular/core';
import { PipesModule } from '../../../shared/pipes.module';

@Component({
  selector: 'app-card-total-amount',
  standalone: true,
  imports: [PipesModule],
  templateUrl: './card-total-amount.component.html',
  styleUrl: './card-total-amount.component.css'
})
export class CardTotalAmountComponent {

  @Input() title: string = "Especifique el titulo"; 
  @Input() type: string = "success"; 
  @Input() amount: number = 0; 
  @Input() height: number = 175; 
  @Input() quantity: number = 175; 
  @Input() totalAmount: number = 0; 
  

}
