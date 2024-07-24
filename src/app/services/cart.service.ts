import { Injectable, ElementRef } from '@angular/core';
declare var bootstrap: any;


@Injectable({
  providedIn: 'root',
})
export class CartService {


  private offcanvas: any;

  constructor() {
    console.log('servicio cargado');
  }

  initializeOffcanvas(offcanvasElement: ElementRef | undefined) {

    if (offcanvasElement && typeof bootstrap !== 'undefined') {
      const element = offcanvasElement.nativeElement;
      if (element) {
        this.offcanvas = new bootstrap.Offcanvas(element);
        (window as any).offcanvas = this.offcanvas; // Hacer offcanvas accesible globalmente para demostración

        element.addEventListener('shown.bs.offcanvas', () => {
          console.log('Offcanvas mostrado');
        });

        element.addEventListener('hide.bs.offcanvas', () => {
          console.log('Offcanvas oculto');
        });

        element.addEventListener('hidden.bs.offcanvas', () => {
          console.log('Offcanvas oculto completamente');
        });
        
      }
    }

  }


  openCart() {
    if (this.offcanvas) {
      console.log('clickc--');
      this.offcanvas.show(); // Mostrar el offcanvas
    }
  }

  closeCart() {
    if (this.offcanvas) {
      this.offcanvas.hide();
    }
  }

}