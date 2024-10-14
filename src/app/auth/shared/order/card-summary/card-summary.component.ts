import { Component, Input } from '@angular/core';
import { PipesModule } from '../../../../shared/pipes.module';

@Component({
  selector: 'app-card-summary',
  standalone: true,
  imports: [PipesModule],
  templateUrl: './card-summary.component.html',
  styleUrl: './card-summary.component.css'
})
export class CardSummaryComponent {

  @Input() subAmount: number = 0; 
  @Input() totalAmount: number = 0; 
  

}


