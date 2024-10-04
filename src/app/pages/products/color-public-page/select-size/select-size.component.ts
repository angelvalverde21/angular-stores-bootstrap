import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-select-size',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-size.component.html',
  styleUrl: './select-size.component.css'
})
export class SelectSizeComponent {

  @Input() sizes: any[] = []; 
  

}
