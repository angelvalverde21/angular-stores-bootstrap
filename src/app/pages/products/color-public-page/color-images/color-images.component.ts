import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Fancybox } from '@fancyapps/ui';

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
    // console.log(this.images);

    if (this.images?.length > 0) {
      this.selectedImage = this.images[0].url_medium; // Establece la primera imagen como seleccionada
    }
  }

  onImageSelect(image: any) {
    this.selectedImage = image.url_medium; // Cambia la imagen seleccionada
  }

  ngOnDestroy(): void {

    Fancybox.unbind(this.elRef.nativeElement);
    Fancybox.close();

  }
}
