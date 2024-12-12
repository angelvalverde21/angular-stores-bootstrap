import { Component, Input, ElementRef, ViewChild, AfterViewInit, CUSTOM_ELEMENTS_SCHEMA,ViewEncapsulation, TemplateRef   } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { DropzoneComponent } from "../../dropzone/dropzone.component";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
register();

@Component({
  selector: 'app-product-gallery',
  standalone: true,
  imports: [CommonModule, DropzoneComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './product-gallery.component.html',
  styleUrl: './product-gallery.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class ProductGalleryComponent implements AfterViewInit{

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

  constructor( private modalService: NgbModal){
    if(environment.showNameComponent){
    this.componentName = this.constructor.name;
    }
  }
  
  ngAfterViewInit() {
    // Espera a que se rendericen los elementos de Swiper
    // const swiperWrapper = document.querySelector('.mySwiper .swiper .swiper-wrapper') as HTMLElement;
      
    // if (swiperWrapper) {
    //   console.log('Swiper Wrapper encontrado');
    //   swiperWrapper.style.display = 'flex';
    //   swiperWrapper.style.justifyContent = 'center';
    // } else {
    //   console.log('Swiper Wrapper no encontrado');
    // }
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

  //Esto va en la parte superior, en los imports
  
  openVerticallyCentered(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true });
  }

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
