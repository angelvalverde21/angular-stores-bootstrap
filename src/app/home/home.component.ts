import { Component } from '@angular/core';
import { StepperComponent } from "../components/stepper/stepper.component";
import { CardPlaceHolderComponent } from "../components/card-place-holder/card-place-holder.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [StepperComponent, CardPlaceHolderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
