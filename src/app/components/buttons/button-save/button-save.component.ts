import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-save',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button-save.component.html',
  styleUrl: './button-save.component.css'
})
export class ButtonSaveComponent {
  @Input() btnLoading: boolean = false; 
  @Input() btnActive: boolean = false; 
  @Input() text: string = "Guardar cambios"; 
  
}
