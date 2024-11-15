import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { CardAddressComponent } from '../../../auth/shared/order/card-address/card-address.component';
import { AuthService } from '../../../services/auth.service';
import { AddressCreateModalComponent } from "../../address/address-create-modal/address-create-modal.component";
import { Subscription } from 'rxjs';
import { AddressService } from '../../../services/address.service';

@Component({
  selector: 'app-accordion-address',
  standalone: true,
	imports: [NgbAccordionModule, CommonModule, CardAddressComponent, AddressCreateModalComponent],
  templateUrl: './accordion-address.component.html',
  styleUrl: './accordion-address.component.css'
})
export class AccordionAddressComponent {

  user: any;
  // addresses: any[] = [];
  seleccionado: number = 0;
  addresesSubscription!: Subscription;

  @Output() addressSelected = new EventEmitter<number>();
  

  @Input() addresses: any[] = []; 
  
  constructor(private _address: AddressService){

  }

  ngOnInit(): void {

    if(!this.addresses.length){
      console.log("No hay direcciones en el localhost");
      this.addresesSubscription = this._address.all().subscribe((resp:any) => {
        this.addresses = resp.data;
      });
    }
    
    // throw new Error('Method not implemented.');
  }
  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
  }

  selected(value:number){
    this.seleccionado = value;
  }

  newAddress(address: any){
    this.addresses.unshift(address);
    this.addressSelected.emit(address.id);
  }
}