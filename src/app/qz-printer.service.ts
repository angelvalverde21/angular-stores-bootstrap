import { Injectable } from '@angular/core';
import * as qz from 'qz-tray';

@Injectable({
  providedIn: 'root'
})
export class QzPrinterService {
  constructor() {
    this.configureQZ();
  }

  /** 🔹 Configurar seguridad de QZ Tray */
  private configureQZ() {
    // Cargar certificado si es necesario (opcional)
    qz.security.setCertificatePromise(() => Promise.resolve(''));

    // Simulación de firma digital (debe ser reemplazada por un servidor real)
    qz.security.setSignaturePromise((toSign:any) => {
      return new Promise((resolve, reject) => {
        try {
          // Simulación de firma (BASE64)
          const signature = btoa(toSign);
          resolve(signature);
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  /** 🔹 Conectar a QZ Tray si no está activo */
  async connect(): Promise<void> {
    if (qz.websocket.isActive()) {
      console.log('⚠️ Ya existe una conexión activa con QZ Tray.');
      return;
    }
    try {
      await qz.websocket.connect();
      console.log('✅ Conectado a QZ Tray');
    } catch (error) {
      console.error('❌ Error al conectar a QZ Tray:', error);
    }
  }

  /** 🔹 Desconectar de QZ Tray */
  async disconnect(): Promise<void> {
    if (qz.websocket.isActive()) {
      await qz.websocket.disconnect();
      console.log('🔌 Desconectado de QZ Tray');
    }
  }

  /** 🔹 Obtener la lista de impresoras disponibles */
  async getPrinters(): Promise<string[]> {
    await this.connect(); // Asegurar conexión antes de buscar impresoras
    try {
      const printers = await qz.printers.find();
      console.log('📠 Impresoras encontradas:', printers);
      return printers;
    } catch (error) {
      console.error('❌ Error al obtener impresoras:', error);
      return [];
    }
  }

  /** 🔹 Imprimir un PDF */
  async printPDF(pdfBlob: Blob, printerName: string): Promise<void> {
    await this.connect(); // Asegurar conexión

    try {
      const config = qz.configs.create(printerName); // Configurar la impresora
      await qz.print(config, [pdfBlob]);
      console.log('✅ PDF enviado a la impresora:', printerName);
    } catch (error) {
      console.error('❌ Error al imprimir PDF:', error);
    }
  }
}
