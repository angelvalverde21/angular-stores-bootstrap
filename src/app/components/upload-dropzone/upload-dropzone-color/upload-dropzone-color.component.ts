import { Component, Input } from '@angular/core';
import { StoreService } from '../../../services/store.service';
import { environment } from '../../../../environments/environment';
import Dropzone from 'dropzone';
import { AuthService } from '../../../services/auth.service';
import { UploadService } from '../../../services/upload.service';

@Component({
  selector: 'app-upload-dropzone-color',
  standalone: true,
  imports: [],
  templateUrl: './upload-dropzone-color.component.html',
  styleUrl: './upload-dropzone-color.component.css'
})
export class UploadDropzoneColorComponent {
  store: string = "";
  url: string = "";
  dropzoneId: string = "";
 
  
  @Input() productId: number = 0;
  @Input() image: string = "";
  @Input() name: string = "logo"; 
  
  constructor(
    private _store : StoreService,
    private _auth : AuthService,
    private _upload: UploadService
    // private upperFirstPipe: UpperFirstPipe
  ){

  }

  ngOnInit(): void {

    this.dropzoneId = `dropzone-${this.name}-${Math.floor(Math.random() * 1000)}`;
    this.store = this._store.leerSlugBase()!;
    this.url =  environment.apiPrivate + '/' + this.store + `/products/${this.productId}/colors/upload`; // Actualiza esto con la URL de tu servidor

  }
  
  ngAfterViewInit(): void { 

    
    setTimeout(() => { //usamos setTimeOut solo para retrazar ligeramente el tiempo de carga, asi esperamos que el contenedor padre cargue primero, en este caso cuando este componente es llamado desde <app-card-config>
    const self = this; // Guardamos una referencia al componente
    // Dropzone.autoDiscover = false; // Desactivar la auto-detección de Dropzone
    console.log(localStorage.getItem('access_token'));
    const dropzone = new Dropzone(`#${this.dropzoneId}`, {
      url: this.url,
      headers: {
        'Authorization': `Bearer ${this._auth.getToken()}`, // Agrega el token de autenticación en los headers
      },
      // dictDefaultMessage: `<div>Sube tus archivos aquí</div> <i class="fas fa-camera" style="font-size: 18pt;"></i>`,
      dictDefaultMessage: `<div class="mb-2">${this.name}</div><i class="fas fa-camera" style="font-size: 18pt;"></i>`,
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
            self.image = resp.image;
            self._upload.ready(resp)
          } else {
            console.error('Error al subir el archivo:', resp.message);
          }
        });

        this.on('sending', (file, xhr, formData) => {
          // Agregar parámetros adicionales de forma dinámica
          formData.append('name', self.name); // Agregar el parámetro 'name'
          formData.append('dir', 'colors'); // Agregar el parámetro 'name'
          formData.append('usage', 'color'); // Agregar el parámetro 'name'
        });
        
        this.on('complete', (file) => {
          this.removeFile(file);
        });

      },
    });

  }, 0);

  }

}
