import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Fancybox } from '@fancyapps/ui';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-color-images',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './color-images.component.html',
  styleUrl: './color-images.component.css',
})
export class ColorImagesComponent implements OnInit, OnDestroy {
  @Input() images: any; // Recibe las imágenes como entrada

  selectedImage: string = '';

  imageLoaded = false;
  imageMediumPlaceHolder: string = environment.imageMediumPlaceHolder;

  constructor(
    private elRef: ElementRef,
  ) {

  }
  ngOnInit() {

    //iniciamos fancybox
    Fancybox.bind(this.elRef.nativeElement, '[data-fancybox]', {
      // Custom options
    });

    // this.selectedImage = this.images;
    console.log('images recibidas');
    
    console.log(this.images);

    this.getImageDefault();
  }

  getImageDefault(){
    if (this.images?.length > 0) {
      this.selectedImage = this.images[0].url_medium; // Establece la primera imagen como seleccionada
    }
  }

  //si bien es cierto la plantilla detecta perfectamente los cambios, pero este componentente solo ejecuta ngOnInit una vez por eso necesitamos nuevamnente detectar el cambio de imagenes
  ngOnChanges(changes: SimpleChanges) {
    if (changes['images']) {
      this.getImageDefault(); // También se ejecuta cuando colorId cambia
    }
  }

  onImageLoad(event:any) {
    this.imageLoaded = true; // Marca la imagen original como cargada
  }

  onImageSelect(image: any) {
    this.selectedImage = image.url_medium; // Cambia la imagen seleccionada
  }

  ngOnDestroy(): void {

    Fancybox.unbind(this.elRef.nativeElement);
    Fancybox.close();

  }
}
