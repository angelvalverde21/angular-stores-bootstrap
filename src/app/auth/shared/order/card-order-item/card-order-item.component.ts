import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PipesModule } from '../../../../shared/pipes.module';

@Component({
  selector: 'app-card-order-item',
  standalone: true,
  imports: [CommonModule, PipesModule],
  templateUrl: './card-order-item.component.html',
  styleUrl: './card-order-item.component.css'
})
export class CardOrderItemComponent {

  @Input() item: any; 
  @Input() bg: string  = "secondary"; 

}
