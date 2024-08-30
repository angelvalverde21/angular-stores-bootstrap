import { Component, Input } from '@angular/core';
import Dropzone from 'dropzone';
import { StoreService } from '../../services/store.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-upload-dropzone',
  standalone: true,
  imports: [],
  templateUrl: './upload-dropzone.component.html',
  styleUrl: './upload-dropzone.component.css',
})
export class UploadDropzoneComponent {

  store: string = "";
  url: string = "";
  imageOption: string = "";

  @Input() optionName: string = "logo"; 
  
  constructor(
    private _store : StoreService
  ){

  }

  ngOnInit(): void {

    this.store = this._store.leerSlugBase()!;
    const self = this; // Guardamos una referencia al componente
    this.url =  environment.apiUrl + '/procesos/options/' + this.store + '/upload', // Actualiza esto con la URL de tu servidor
      
    Dropzone.autoDiscover = false; // Desactivar la auto-detección de Dropzone

    const dropzone = new Dropzone('#my-dropzone', {
      url: this.url,
      headers: {
        'X-CSRF-TOKEN': 'tu-csrf-token', // Actualiza esto según corresponda
      },
      dictDefaultMessage: `<div>Sube tus archivos aquí</div> <i class="fas fa-camera" style="font-size: 18pt;"></i>`,
      acceptedFiles: 'image/*',
      // paramName: 'file',
      maxFilesize: 10, // Tamaño máximo en MB
      init: function () {

        this.on('success', function(file, resp:any) {
          // Manejar la respuesta JSON aquí
          console.log('Respuesta del servidor:', resp);

          if (resp.success) {
            // Puedes mostrar un mensaje, actualizar la UI, etc.
            console.log('Archivo subido correctamente:', resp.image);
            self.imageOption = resp.image;
            
          } else {
            console.error('Error al subir el archivo:', resp.message);
          }
        });

        this.on('sending', (file, xhr, formData) => {
          // Agregar parámetros adicionales de forma dinámica
          formData.append('name', self.optionName); // Agregar el parámetro 'name'
        });
        
        this.on('complete', (file) => {
          this.removeFile(file);
        });

      },
    });
  }

}
