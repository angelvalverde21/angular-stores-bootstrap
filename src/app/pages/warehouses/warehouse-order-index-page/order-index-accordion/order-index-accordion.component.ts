import { Component, Input } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-order-index-accordion',
  standalone: true,
  imports: [NgbAccordionModule],
  templateUrl: './order-index-accordion.component.html',
  styleUrl: './order-index-accordion.component.css'
})
export class OrderIndexAccordionComponent {

  items = ['First', 'Second', 'Third'];
  seleccionado: number = 1;
  
  
  selected(value:number){
    this.seleccionado = value;
  }


}
