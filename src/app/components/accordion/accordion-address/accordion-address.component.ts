import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { CardAddressComponent } from '../../../auth/shared/order/card-address/card-address.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-accordion-address',
  standalone: true,
	imports: [NgbAccordionModule, CommonModule, CardAddressComponent],
  templateUrl: './accordion-address.component.html',
  styleUrl: './accordion-address.component.css'
})
export class AccordionAddressComponent {

  user: any;
  // addresses: any[] = [];
  seleccionado: number = 0;

  @Input() addresses: any[] = []; 
  
  constructor(){

  }

  ngOnInit(): void {

  
    
    // throw new Error('Method not implemented.');
  }
  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
  }

  selected(value:number){
    this.seleccionado = value;
  }
}