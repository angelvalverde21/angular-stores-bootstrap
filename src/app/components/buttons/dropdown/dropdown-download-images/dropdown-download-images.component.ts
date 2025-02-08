import { Component, Input } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dropdown-download-images',
  standalone: true,
  imports: [NgbDropdownModule],
  templateUrl: './dropdown-download-images.component.html',
  styleUrl: './dropdown-download-images.component.css'
})
export class DropdownDownloadImagesComponent {

  @Input() image: any; 
  

}


