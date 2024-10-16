import { Component, Input } from '@angular/core';
import { PipesModule } from '../../../../shared/pipes.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-summary',
  standalone: true,
  imports: [PipesModule, CommonModule],
  templateUrl: './card-summary.component.html',
  styleUrl: './card-summary.component.css'
})
export class CardSummaryComponent {

  @Input() subAmount: number = 0; 
  @Input() totalAmount: number = 0; 
  @Input() is_pay: boolean = false; 
  
}


