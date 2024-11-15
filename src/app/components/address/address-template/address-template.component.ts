import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-address-template',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './address-template.component.html',
  styleUrl: './address-template.component.css'
})
export class AddressTemplateComponent {

  @Input() address: any; 

}
