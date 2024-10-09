import { Component } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { StepperComponent } from "../../components/stepper/stepper.component";
import { InputGroupComponent } from "../../components/forms/input-group/input-group.component";
import { ButtonSaveComponent } from "../../components/buttons/button-save/button-save.component";

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [HeaderComponent, StepperComponent, InputGroupComponent, ButtonSaveComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

}
