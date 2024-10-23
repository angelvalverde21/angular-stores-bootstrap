import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-item-order-create',
  standalone: true,
  imports: [],
  templateUrl: './item-order-create.component.html',
  styleUrl: './item-order-create.component.css'
})
export class ItemOrderCreateComponent{

  @Input() image: string = "https://placehold.co/100x100"; 
  @Input() size: string = ""; 
  @Input() quantity: number = 0; 
  @Input() item_id: number = 0; 
  
  eliminarItem(value: number){
    console.log(value);
    
  }

}
