import { Component, Input } from '@angular/core';
import { UploadDropzoneComponent } from "../../upload-dropzone/upload-dropzone.component";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-gallery',
  standalone: true,
  imports: [UploadDropzoneComponent],
  templateUrl: './modal-gallery.component.html',
  styleUrl: './modal-gallery.component.css'
})
export class ModalGalleryComponent {

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
