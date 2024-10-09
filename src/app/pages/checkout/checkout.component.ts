import { Component } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { StepperComponent } from "../../components/stepper/stepper.component";

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [HeaderComponent, StepperComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

}
