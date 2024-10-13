import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-courier',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-courier.component.html',
  styleUrl: './card-courier.component.css'
})
export class CardCourierComponent {

  @Input() courier_address: any; 

}
