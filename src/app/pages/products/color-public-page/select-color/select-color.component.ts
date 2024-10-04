import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-select-color',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-color.component.html',
  styleUrl: './select-color.component.css'
})
export class SelectColorComponent {

  @Input() colors: any; 
  

}
