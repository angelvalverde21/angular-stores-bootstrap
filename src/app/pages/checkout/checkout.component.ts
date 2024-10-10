import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { StepperComponent } from "../../components/stepper/stepper.component";
import { InputGroupComponent } from "../../components/forms/input-group/input-group.component";
import { ButtonSaveComponent } from "../../components/buttons/button-save/button-save.component";
import { InputPhoneComponent } from "../../shared/forms/input-phone/input-phone.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { OrderSummaryComponent } from "../../components/order-summary/order-summary.component";
import { InputDistrictIdComponent } from "../../shared/forms/input-district-id/input-district-id.component";

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [HeaderComponent, StepperComponent, InputGroupComponent, ButtonSaveComponent, InputPhoneComponent, ReactiveFormsModule, CommonModule, OrderSummaryComponent, InputDistrictIdComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{

  constructor(
    private fb: FormBuilder,
    private _cart: CartService
  ) { }
  
  ngOnInit(): void {

    window.scrollTo(0, 0);
    // console.log(this.color_id);
    // console.log(this.product_id);

    // console.log('inico');
    this.initForm();
  }

  form!: FormGroup;

  private initForm(): void {
    // Verificar si el formulario ya fue inicializado

      this.form = this.fb.group({
        phone: ['',
          {
            //[0123456789]{1,9} Expresion regular que quiere decir que se puede usar numeros del 0 al 9 y que la longitud aceptada va de 1 digito a 9 digitos
            //[0123456789]{9} Expresion regular que quiere decir que se puede usar numeros del 0 al 9 y que la longitud aceptada solo es de 9 digitos
            validators: [Validators.required, Validators.pattern('9[0123456789]{8}')],
            asyncValidators: [this._cart.verifyPhone]
          }
        ],
        dni: ['',
          {
            validators: [Validators.required, Validators.pattern('[0123456789]{8,8}')],
            asyncValidators: [this._cart.verifyDni]
          }
        ],
        name: ['', [Validators.required]],
        primary: ['', [Validators.required]],
        secondary: [''],
        references: [''],
        district_id: ['', [Validators.required]],
      });
    
  }

  isValid(value: string):boolean{
    if (this.form.get(value)?.valid && this.form.get(value)?.touched) {
      // console.log('VALIDO');
      return true;
    }else{
      return false;
    }
  }

  isInvalid(value: string):boolean{


    if (this.form.get(value)?.invalid && this.form.get(value)?.touched) {
      // console.log('INVALIDO');
      return true;
    } else {
      return false;
    }

  }

  save(){
    console.log(this.form.value);
    console.log(this._cart.getItems());
    
    
  }

}
