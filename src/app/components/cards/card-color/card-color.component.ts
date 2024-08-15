import { Component, Input } from '@angular/core';
import { PipesModule } from '../../../shared/pipes.module';
import { Color } from '../../../interfaces/color.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-color',
  standalone: true,
  imports: [PipesModule, CommonModule],
  templateUrl: './card-color.component.html',
  styleUrl: './card-color.component.css'
})
export class CardColorComponent {

  @Input() color: Color = {}; 
  
  @Input() precio: number = 0; 
  
}
