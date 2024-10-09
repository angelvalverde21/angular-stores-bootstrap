import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { StepperComponent } from "../../components/stepper/stepper.component";
import { InputGroupComponent } from "../../components/forms/input-group/input-group.component";
import { ButtonSaveComponent } from "../../components/buttons/button-save/button-save.component";
import { InputPhoneComponent } from "../../shared/forms/input-phone/input-phone.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [HeaderComponent, StepperComponent, InputGroupComponent, ButtonSaveComponent, InputPhoneComponent, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{

  constructor(
    private fb: FormBuilder,
  ) { }
  
  ngOnInit(): void {

    
    // console.log(this.color_id);
    // console.log(this.product_id);

    // console.log('inico');
    this.initForm();
  }

  form!: FormGroup;

  private initForm(): void {
    // Verificar si el formulario ya fue inicializado

      this.form = this.fb.group({
        phone: ['943402809', [Validators.required]],
        dni: ['', [Validators.required]],
        name: ['', [Validators.required]],
        primary: ['', [Validators.required]],
        secondary: ['', [Validators.required]],
        district_id: ['', [Validators.required]],
      });
    
  }


}
