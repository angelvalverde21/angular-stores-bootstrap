import { Component } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { HeaderComponent } from "../../header/header.component";
import { StepperComponent } from "../../components/stepper/stepper.component";

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CardComponent, HeaderComponent, StepperComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {

}
