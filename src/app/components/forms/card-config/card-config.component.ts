import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-config',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-config.component.html'
})
export class CardConfigComponent {
  @Input() title: string = ""; 
  @Input() loading: boolean = false; 
  
}
