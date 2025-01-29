import { Injectable } from '@angular/core';
import * as qz from 'qz-tray';

@Injectable({
  providedIn: 'root'
})
export class QzPrinterService {
  constructor() {
    this.configureQZ();
  }

  private configureQZ() {
    qz.security.setCertificatePromise(() => {
      return fetch('/assets/qz-tray-cert.pem') // Opcional si usas certificados
        .then(response => response.text());
    });

    qz.security.setSignaturePromise((toSign) => {
      return fetch('/sign', { method: 'POST', body: JSON.stringify({ data: toSign }) })
        .then(response => response.text());
    });
  }

  async connect() {
    if (qz.websocket.isActive()) {
      console.log('⚠️ Ya existe una conexión con QZ Tray.');
      return; // No intentes conectar de nuevo
    }

    try {
      await qz.websocket.connect();
      console.log('✅ Conectado a QZ Tray');
    } catch (error) {
      console.error('❌ Error al conectar a QZ Tray:', error);
    }
  }

  async disconnect() {
    if (qz.websocket.isActive()) {
      await qz.websocket.disconnect();
      console.log('🔌 Desconectado de QZ Tray');
    }
  }

  async getPrinters() {
    await this.connect(); // Asegura que haya conexión antes de obtener las impresoras
    return qz.printers.find();
  }

  async printPDF(pdfBlob: Blob, printerName: string) {
    await this.connect(); // Solo se conecta si no lo está

    try {
      const config = qz.configs.create(printerName);
      await qz.print(config, pdfBlob);
      console.log('✅ PDF enviado a la impresora');
    } catch (error) {
      console.error('❌ Error al imprimir PDF:', error);
    }
  }
}

