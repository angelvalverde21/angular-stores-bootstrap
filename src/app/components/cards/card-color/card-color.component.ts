import { Component, Input } from '@angular/core';
import { PipesModule } from '../../../shared/pipes.module';
import { Color } from '../../../interfaces/color.interface';

@Component({
  selector: 'app-card-color',
  standalone: true,
  imports: [PipesModule],
  templateUrl: './card-color.component.html',
  styleUrl: './card-color.component.css'
})
export class CardColorComponent {

  @Input() color: Color = {}; 
  
}
