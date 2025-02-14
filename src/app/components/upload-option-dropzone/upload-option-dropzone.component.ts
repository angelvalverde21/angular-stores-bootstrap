import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import Dropzone from 'dropzone';
import { StoreService } from '../../services/store.service';
import { environment } from '../../../environments/environment';
// import { UpperFirstPipe } from '../../shared/Pipes/upper-first.pipe';
import { PipesModule } from '../../shared/pipes.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload-option-dropzone',
  standalone: true,
  imports: [PipesModule, CommonModule],
  templateUrl: './upload-option-dropzone.component.html',
  styleUrl: './upload-option-dropzone.component.css'
})
export class UploadOptionDropzoneComponent implements OnInit, AfterViewInit {

  store: string = "";
  url: string = "";
  dropzoneId: string = "";
  
  @Input() image: string = "";
  @Input() name: string = "logo"; 
  
  constructor(
    private _store : StoreService,
    // private upperFirstPipe: UpperFirstPipe
  ){

  }

  ngOnInit(): void {

    this.dropzoneId = `dropzone-${this.name}-${Math.floor(Math.random() * 1000)}`;
    this.store = this._store.leerSlugBase()!;
    this.url =  environment.apiUrl + '/procesos/options/' + this.store + '/upload'; // Actualiza esto con la URL de tu servidor
    
  }
 
  ngAfterViewInit(): void { 
    
    setTimeout(() => { //usamos setTimeOut solo para retrazar ligeramente el tiempo de carga, asi esperamos que el contenedor padre cargue primero, en este caso cuando este componente es llamado desde <app-card-config>
    const self = this; // Guardamos una referencia al componente
    // Dropzone.autoDiscover = false; // Desactivar la auto-detección de Dropzone

    const dropzone = new Dropzone(`#${this.dropzoneId}`, {
      url: this.url,
      headers: {
        'X-CSRF-TOKEN': 'tu-csrf-token', // Actualiza esto según corresponda
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
          console.log(resp);
          
          if (resp.success) {
            // Puedes mostrar un mensaje, actualizar la UI, etc.
            console.log('Archivo subido correctamente:', resp.image);
            self.image = resp.image;
            
          } else {
            console.error('Error al subir el archivo:', resp.message);
          }
        });

        this.on('sending', (file, xhr, formData) => {
          // Agregar parámetros adicionales de forma dinámica
          formData.append('name', self.name); // Agregar el parámetro 'name'
        });
        
        this.on('complete', (file) => {
          this.removeFile(file);
        });

      },
    });

  }, 0);

  }

}
