import { Injectable } from '@angular/core';
declare let qz: any;

@Injectable({
  providedIn: 'root'
})

export class QzPrinterService {

  constructor() {}

  // Método para conectar con QZ Tray
  private connectToQZTray(): Promise<void> {
    return new Promise((resolve, reject) => {
      qz.websocket.connect().then(() => {
        console.log('Conectado a QZ Tray');
        resolve();
      }).catch((err:any) => {
        console.error('Error al conectar a QZ Tray:', err);
        reject(err);
      });
    });
  }

  // Método para obtener la lista de impresoras disponibles
  getPrinters(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      if (!qz.websocket.isActive()) {
        qz.websocket.connect()
          .then(() => {
            return qz.printers.find();
          })
          .then((printers: string[]) => {
            console.log('Impresoras disponibles:', printers);
            resolve(printers);
          })
          .catch((err:any) => {
            console.error('Error al obtener impresoras:', err);
            reject(err);
          });
      } else {
        qz.printers.find()
          .then((printers: string[]) => {
            console.log('Impresoras disponibles:', printers);
            resolve(printers);
          })
          .catch((err:any) => {
            console.error('Error al obtener impresoras:', err);
            reject(err);
          });
      }
    });
  }
  

  // Método para imprimir el PDF
  printPDF(pdfBlob: Blob, printerName: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.connectToQZTray().then(() => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const pdfBase64 = e.target.result.split(',')[1];

          // Configurar la impresora
          const config = qz.configs.create(printerName);

          // Preparar los datos para la impresión
          const data = [{
            type: 'pdf',
            format: 'base64',
            data: pdfBase64,
          }];

          // Imprimir el PDF
          qz.print(config, data).then(() => {
            console.log('PDF enviado a la impresora');
            qz.websocket.disconnect();
            resolve();
          }).catch((err:any) => {
            console.error('Error al imprimir el PDF:', err);
            qz.websocket.disconnect();
            reject(err);
          });
        };
        reader.readAsDataURL(pdfBlob); // Convertir Blob a Base64
      }).catch((err) => {
        reject(err);
      });
    });
  }

}
