import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-add-cart',
  standalone: true,
  imports: [],
  templateUrl: './button-add-cart.component.html',
  styleUrl: './button-add-cart.component.css'
})
export class ButtonAddCartComponent {

  @Input() isValid: boolean = false; 
  
}
