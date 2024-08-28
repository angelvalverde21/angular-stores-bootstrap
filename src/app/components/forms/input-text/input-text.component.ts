import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-text',
  standalone: true,
  imports: [],
  templateUrl: './input-text.component.html'
})
export class InputTextComponent {

  @Input() data: any; 
  @Input() controlName!: string;
}
