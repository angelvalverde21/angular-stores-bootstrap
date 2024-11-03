import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-address-default',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './address-default.component.html',
  styleUrl: './address-default.component.css'
})
export class AddressDefaultComponent {

  @Input() address: any; 
  @Input() title: any; 
  @Input() bg: string  = "secondary"; 
  @Input() show: boolean = false; 
  

}
