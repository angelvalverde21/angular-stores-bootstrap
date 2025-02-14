import { Component, Input } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { UploadDropzoneComponent } from "../../upload-dropzone/upload-dropzone.component";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-color-photos',
  standalone: true,
  imports: [NgbNavModule, UploadDropzoneComponent],
  templateUrl: './modal-color-photos.component.html',
  styleUrl: './modal-color-photos.component.css'
})

export class ModalColorPhotosComponent {

  active = 1;

  @Input() color_id: number = 0; 
  
  fileUpload(event: any){
    console.log(event);
    
  }

  fileTotalUpload(event: boolean){

  }

  errorUpload(event: boolean){
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se subio el archivo',
    }).then((result) => {
      if (result.isConfirmed) {
        
      }
    });
    
  }

}
