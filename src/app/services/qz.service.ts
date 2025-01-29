import { Injectable } from '@angular/core';

declare var qz: any;  // Esto permite usar la librería de QZ

@Injectable({
  providedIn: 'root'
})
export class QzService {

  constructor() { }

  connect() {
    return new Promise((resolve, reject) => {
      if (qz.websocket.isActive()) {
        console.log("Ya existe una conexión activa.");
        resolve(true);  // Si ya hay conexión, simplemente resolvemos.
      } else {
        qz.websocket.connect().then(() => {
          console.log("Conexión exitosa con QZ Tray.");
          resolve(true);
        }).catch((err: any) => {
          console.error("Error al conectar con QZ Tray:", err);
          reject(false);
        });
      }
    });
  }
  // Método para listar las impresoras disponibles
  listPrinters() {
    qz.printers.find().then((printers: any) => {
      console.log("Impresoras disponibles:", printers);
    }).catch((err: any) => {
      console.error("Error al listar impresoras:", err);
    });
  }

  printLabel(title:string, code: number) {
    // Primero, lista las impresoras disponibles para encontrar el nombre exacto
    this.listPrinters();

    const config = qz.configs.create('ZDesigner LP 2844-Z');  // Asegúrate de que el nombre coincida exactamente

    const data   = `^XA
                    // Título en la parte superior (aproximadamente 30 puntos de alto)
                    // ^FO situa la posicion en el 0,0 de la etiqueta y 30,20 situa la posicion en el posicion x=30 e y=20
                    ^FO30,20
                    ^A0N,30,25 // el primer 30 indica el alto de cada letra y el siguiente 20 indica el ancho de cada leta
                    ^FD${title}^FS
                  
                    // Código de barras en la parte media
                    ^FO30,70
                    ^B3N,N,60,Y,N
                    ^FD>:${code}^FS
                  ^XZ`;

    qz.print(config, [data]).catch((err: any) => console.error('Error al imprimir:', err));
  }
}