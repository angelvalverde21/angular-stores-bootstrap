import {Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
declare var $: any;
declare var bootstrap: any;

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements AfterViewInit {

  @ViewChild('offcanvasExample', { static: false }) offcanvasElement!: ElementRef;

  private offcanvas: any;

  constructor() { }

  ngAfterViewInit() {
    // Asegúrate de que Bootstrap esté disponible globalmente
    if (typeof bootstrap !== 'undefined') {
      const offcanvasElement = document.getElementById('offcanvasExample');
      if (offcanvasElement) {
        const offcanvas = new bootstrap.Offcanvas(offcanvasElement);
        (window as any).offcanvas = offcanvas; // Hacer offcanvas accesible globalmente para demostración
      }
    }
  }

  openOffcanvas() {
    (window as any).offcanvas.show(); // Mostrar el offcanvas
  }

  closeOffcanvas() {
    if (this.offcanvas) {
      this.offcanvas.hide();
    }
  }
}