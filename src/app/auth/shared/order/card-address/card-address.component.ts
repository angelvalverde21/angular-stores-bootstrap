import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-address',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-address.component.html',
  styleUrl: './card-address.component.css'
})
export class CardAddressComponent {

  @Input() address: any; 
  @Input() title: any; 
  

}
