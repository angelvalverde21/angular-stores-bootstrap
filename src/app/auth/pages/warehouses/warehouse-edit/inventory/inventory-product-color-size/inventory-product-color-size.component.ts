import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ColorSizeComponent } from '../../../../../shared/color-size/color-size.component';

@Component({
  selector: 'app-inventory-product-color-size',
  standalone: true,
  imports: [CommonModule, ColorSizeComponent],
  templateUrl: './inventory-product-color-size.component.html',
  styleUrl: './inventory-product-color-size.component.css'
})
export class InventoryProductColorSizeComponent {


  @Input() warehouse_id: number = 0; 
  @Input() product: any; 
  
  constructor(private _route: ActivatedRoute){

  }

}
