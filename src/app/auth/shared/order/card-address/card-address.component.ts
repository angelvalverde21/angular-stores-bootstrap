import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UploadDropzoneColorComponent } from "../../../../components/upload-dropzone/upload-dropzone-color/upload-dropzone-color.component";

@Component({
  selector: 'app-card-address',
  standalone: true,
  imports: [CommonModule, UploadDropzoneColorComponent],
  templateUrl: './card-address.component.html',
  styleUrl: './card-address.component.css'
})
export class CardAddressComponent {

  @Input() address: any; 
  @Input() title: any; 
  @Input() bg: string  = "secondary"; 
  @Input() show: string | false = false; 
  

}
