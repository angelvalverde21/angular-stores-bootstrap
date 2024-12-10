import { Component, Input, ElementRef, ViewChild, AfterViewInit, CUSTOM_ELEMENTS_SCHEMA   } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { DropzoneComponent } from "../../dropzone/dropzone.component";
import Swal from 'sweetalert2';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-product-gallery',
  standalone: true,
  imports: [CommonModule, DropzoneComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './product-gallery.component.html',
  styleUrl: './product-gallery.component.css'
})
export class ProductGalleryComponent {

  // @ViewChild('carouselTrack', { static: true }) carouselTrack!: ElementRef<HTMLDivElement>;

  componentName : string = "";
  @Input() product: any; 
  
  breakpoints = {
    360: { slidesPerView: 4 },
    640: { slidesPerView: 4 },
    768: { slidesPerView: 4 },
    1024: { slidesPerView: 6 },
    1440: { slidesPerView: 8 }
  };

  constructor(){
    if(environment.showNameComponent){
    this.componentName = this.constructor.name;
    }
  }

  imageAdd(dropzone: any){
    console.log('submit');

  }

  imageUpload(image: any){
    this.product.images.unshift(image);
  }

  imageUploadStatus(value: boolean){
    console.log(value);

    // if (value) {
    //   Swal.fire({
    //     icon: 'success',
    //     title: 'Correcto',
    //     text: 'La operacion ha sido ejecutada correctamente',
    //     confirmButtonText: 'OK',
    //     showConfirmButton: true
    //   })
    // } else {
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Error',
    //     text: 'Ha ocurrido un error al subir',
    //   });
      
    // }

  }

  swal: any;

  // onSubmit(dropzone: DropzonePaymentComponent) {

    // dropzone.processQueue({});

    // this.swal = Swal.fire({
    //   title: 'Espere...',
    //   html: 'Cargando las imagenes',
    //   allowOutsideClick: false,
    //   didOpen: () => {
    //     Swal.showLoading();
        
    //   }
    // })

  // }


}
