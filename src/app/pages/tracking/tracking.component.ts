import { Component } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { StepperComponent } from "../../components/stepper/stepper.component";
import { CardComponent } from "../../components/card/card.component";

@Component({
  selector: 'app-tracking',
  standalone: true,
  imports: [HeaderComponent, StepperComponent, CardComponent],
  templateUrl: './tracking.component.html',
  styleUrl: './tracking.component.css'
})
export class TrackingComponent {

}
