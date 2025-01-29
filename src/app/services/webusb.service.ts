declare global {
  interface Navigator {
    usb: any; // Habilita navigator.usb
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebUSBService {
  private device: any = null;

  constructor() {}

  /** 🔹 Solicitar acceso al dispositivo USB */
  async requestDevice(): Promise<void> {
    try {
      const device = await navigator.usb.requestDevice({ filters: [{}] });
      console.log('Dispositivo seleccionado:', device.productName);
      await device.open();
      console.log('Dispositivo abierto correctamente');
    } catch (error) {
      if (error instanceof DOMException) {
        if (error.name === 'SecurityError') {
          console.error('Acceso denegado al dispositivo USB:', error);
        } else {
          console.error('Error desconocido:', error);
        }
      } else {
        console.error('Error general:', error);
      }
    }
  }

  /** 🔹 Enviar datos al dispositivo USB */
  async sendData(data: Uint8Array): Promise<void> {
    if (!this.device) {
      console.error('❌ No hay dispositivo USB conectado.');
      return;
    }

    try {
      await this.device.transferOut(1, data);
      console.log('📤 Datos enviados al dispositivo');
    } catch (error) {
      console.error('❌ Error al enviar datos:', error);
    }
  }
}
