import { Injectable } from '@angular/core';

declare var qz: any;  // Esto permite usar la librería de QZ

@Injectable({
  providedIn: 'root'
})
export class QzService {

  constructor() { }

  data: any; 

  // Método para conectar con QZ Tray
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
    return new Promise((resolve, reject) => {
      qz.printers.find().then((printers: any) => {
        console.log("Impresoras disponibles:", printers);
        resolve(printers);  // Devolvemos la lista de impresoras
      }).catch((err: any) => {
        console.error("Error al listar impresoras:", err);
        reject(err);
      });
    });
  }

  // Método para imprimir la etiqueta múltiples veces sin confirmación
  printLabel(title: string, code: number, copies: number) {
    // Primero, lista las impresoras disponibles para encontrar el nombre exacto
    this.listPrinters().then((printers: any) => {
      const printerName = 'ZDesigner LP 2844-Z';  // Ajusta el nombre según el que encuentres

      // Verifica si la impresora está en la lista de impresoras disponibles
      if (printers.includes(printerName)) {
        const config = qz.configs.create(printerName, { 
          silent: true // Activamos el modo silencioso para que no pida confirmación, auno no funciona esto
        });

        // Datos de la etiqueta con el texto y el código de barras
        const data = `^XA
                        ^FO30,20
                        ^A0N,30,25
                        ^FD${title}^FS
                      
                        ^FO30,70
                        ^B3N,N,60,Y,N
                        ^FD>:${code}^FS
                      ^XZ`;

        // Imprimir la etiqueta la cantidad de veces especificada
        for (let i = 0; i < copies; i++) {
          qz.print(config, [data]).catch((err: any) => console.error('Error al imprimir:', err));
        }
      } else {
        console.error(`Impresora ${printerName} no encontrada en la lista de impresoras.`);
      }
    }).catch((err: any) => {
      console.error("Error al obtener la lista de impresoras:", err);
    });
  }

  printLabelSize(code: number, size: string) {
    // Primero, lista las impresoras disponibles para encontrar el nombre exacto
    this.listPrinters().then((printers: any) => {
      const printerName = 'ZDesigner LP 2844-Z';  // Ajusta el nombre según el que encuentres

      // Verifica si la impresora está en la lista de impresoras disponibles
      if (printers.includes(printerName)) {
        const config = qz.configs.create(printerName, { 
          silent: true // Activamos el modo silencioso para que no pida confirmación, auno no funciona esto
        });

        // Datos de la etiqueta con el texto y el código de barras

        if(size.length <= 1){

          this.data = `^XA
                        ^FO30,15
                        ^A0N,30,17
                        ^FDAquarella Ropa y Accesorios^FS
                      
                        ^FO30,50
                        ^B3N,N,45,Y,N
                        ^FD>:${code}^FS

                        ^FO75,120
                        ^A0N,30,25
                        ^FD-- ${size} --^FS
                      ^XZ`;

        }else{

          this.data = `^XA
                        ^FO30,15
                        ^A0N,30,17
                        ^FDAquarella Ropa y Accesorios^FS
                      
                        ^FO30,50
                        ^B3N,N,45,Y,N
                        ^FD>:${code}^FS

                        ^FO70,120
                        ^A0N,30,25
                        ^FD${size}^FS
                      ^XZ`;
        }

     
        // Imprimir la etiqueta la cantidad de veces especificada
        qz.print(config, [this.data]).catch((err: any) => console.error('Error al imprimir:', err));

      } else {
        console.error(`Impresora ${printerName} no encontrada en la lista de impresoras.`);
      }
    }).catch((err: any) => {
      console.error("Error al obtener la lista de impresoras:", err);
    });
  }
}
