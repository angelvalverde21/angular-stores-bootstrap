import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { StepperComponent } from "../stepper/stepper.component";
import { InputGroupComponent } from "../forms/input-group/input-group.component";
import { ButtonSaveComponent } from "../buttons/button-save/button-save.component";
import { InputPhoneComponent } from "../../shared/forms/input-phone/input-phone.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { InputDistrictIdComponent } from "../../shared/forms/input-district-id/input-district-id.component";
import { OrderPublicService } from '../../services/order-public.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { AuthService } from '../../services/auth.service';
import { LoadingCenterComponent } from "../loading-center/loading-center.component";
import { OverlayComponent } from "../overlay/overlay.component";
import { CartComponent } from "../cart/cart.component";
import { AddressFormComponent } from "../address/address-form/address-form.component";

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [HeaderComponent, StepperComponent, InputGroupComponent, ButtonSaveComponent, InputPhoneComponent, ReactiveFormsModule, CommonModule, InputDistrictIdComponent, LoadingCenterComponent, OverlayComponent, CartComponent, AddressFormComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})

export class CheckoutComponent implements OnInit, OnDestroy{

  generateOrderSubscription!: Subscription;
  store: string = "";
  saving: boolean = false;
  formChildrenIsValid: boolean = false;
  data: any;
  constructor(
    private fb: FormBuilder,
    private _cart: CartService,
    private _orderPublic: OrderPublicService,
    private router: Router,
    private _store: StoreService,
    private _auth: AuthService
  ) { }

  ngOnInit(): void {

    this.store = this._store.name()!;

    this.form = this.fb.group({
      address: []
    });

  }
  
  form!: FormGroup;

  save(){
    // console.log(this.form.value);
    // console.log(this._cart.getItems());

    this.saving = true;

    let data = this.form.value;
    data.order = this._cart.getItems()

    console.log(data);
  
    this.generateOrderSubscription = this._orderPublic.generateOrder(data).subscribe({
      
      next: (resp:any) =>{

        console.log(resp);

        const value = resp.data;
        
        this._auth.setLogin(value.access_token, value.user, value.store);

        this.router.navigate(['/', this.store, 'auth' , 'orders' , value.order_id ]);

        this.saving = false;

      },
      error: (error:any) => {
        
      }
    }
  );

  }

  ngOnDestroy(): void {
    if (this.generateOrderSubscription) {
      this.generateOrderSubscription.unsubscribe();
    }
  }
  
  formValid(value: boolean){
    this.formChildrenIsValid = value;
  }

}
