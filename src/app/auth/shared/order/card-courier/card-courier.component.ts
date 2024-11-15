import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonDotsVerticalComponent } from "../../../../components/button-dots-vertical/button-dots-vertical.component";

@Component({
  selector: 'app-card-courier',
  standalone: true,
  imports: [CommonModule, ButtonDotsVerticalComponent],
  templateUrl: './card-courier.component.html',
  styleUrl: './card-courier.component.css'
})
export class CardCourierComponent {

  @Input() courier_address: any; 
  @Input() bg: string  = "light text-dark"; 
}
