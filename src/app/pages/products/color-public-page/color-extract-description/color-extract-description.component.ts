import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-color-extract-description',
  standalone: true,
  imports: [],
  templateUrl: './color-extract-description.component.html',
  styleUrl: './color-extract-description.component.css'
})
export class ColorExtractDescriptionComponent {

  @Input() name: string = "Nombre del producto"; 
  @Input() body: string = ""; 
  

}
