import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { CardAddressComponent } from "../../auth/shared/order/card-address/card-address.component";

@Component({
  selector: 'app-checkout-auth',
  standalone: true,
	imports: [NgbAccordionModule, CommonModule, CardAddressComponent],
  templateUrl: './checkout-auth.component.html',
  styleUrl: './checkout-auth.component.css'
})
export class CheckoutAuthComponent implements OnInit, OnDestroy {

  user: any;
  addresses: any[] = [];
  seleccionado: number = 0;

  constructor(private _auth: AuthService){

  }

  ngOnInit(): void {

    
    this.user = this._auth.user();
    this.addresses = this.user.addresses;
    // throw new Error('Method not implemented.');
  }
  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
  }

  selected(value:number){
    this.seleccionado = value;
  }
}
