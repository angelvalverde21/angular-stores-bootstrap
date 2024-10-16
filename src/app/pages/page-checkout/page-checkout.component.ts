import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { StepperComponent } from "../../components/stepper/stepper.component";
import { Subscription } from 'rxjs';
import { StoreService } from '../../services/store.service';
import { CartComponent } from "../../components/cart/cart.component";
import { CheckoutComponent } from "../../components/checkout/checkout.component";
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { CheckoutAuthComponent } from '../../components/checkout-auth/checkout-auth.component';
import { SummaryComponent } from "../../components/summary/summary.component";
import { AddressFormComponent } from "../../components/address-form/address-form.component";
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-page-checkout',
  standalone: true,
  imports: [HeaderComponent, StepperComponent, CartComponent, CheckoutComponent, CommonModule, CheckoutAuthComponent, SummaryComponent, AddressFormComponent, ReactiveFormsModule],
  templateUrl: './page-checkout.component.html',
  styleUrl: './page-checkout.component.css'
})
export class PageCheckoutComponent {

  generateOrderSubscription!: Subscription;
  store: string = "";
  saving: boolean = false;
  is_auth: boolean = false;
  formChildrenIsValid: boolean = false;

  constructor(
    private _auth: AuthService,
    private _store: StoreService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {

    this.store = this._store.name()!;
    this.is_auth = this._auth.estaAutenticado();

    window.scrollTo(0, 0);
    // console.log(this.color_id);
    // console.log(this.product_id);

    // console.log('inico');

    this.store = this._store.name()!;

    this.form = this.fb.group({
      address: []
    });

  }
  
  form!: FormGroup;

  formValid(value: boolean){
    this.formChildrenIsValid = value;
  }


  save(){

  }
}
