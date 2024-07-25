import { Component } from '@angular/core';
import { StepperComponent } from "../../components/stepper/stepper.component";
import { CardPlaceHolderComponent } from "../../components/card-place-holder/card-place-holder.component";
import { HeaderComponent } from "../../header/header.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [StepperComponent, CardPlaceHolderComponent, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
