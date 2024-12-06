import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import Dropzone from 'dropzone';
// import { UpperFirstPipe } from '../../shared/Pipes/upper-first.pipe';
import { PipesModule } from '../../shared/pipes.module';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { StoreService } from '../../services/store.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dropzone',
  standalone: true,
  imports: [
    PipesModule,
    CommonModule,
],
  templateUrl: './dropzone.component.html',
  styleUrl: './dropzone.component.css'
})

export class DropzoneComponent implements OnInit, AfterViewInit {
  store: string = '';
  url: string = '';
  dropzoneId: string = '';
  image: string = '';
  // process: boolean = false;
  // @Input() image: string = "";
  

  @Input() autoProcess: boolean = false;
  @Input() maxFiles: number = 1;
  @Input() imageDefault: string = '';
  @Input() name: string = 'logo';
  @Input() slug: string = '';
  @Output() eventUpload = new EventEmitter<[]>();
  @Output() eventAddFile = new EventEmitter<boolean>();
  
  @Output() eventSuccess = new EventEmitter<any>();
  @Output() eventSending = new EventEmitter<boolean>();
  @Output() eventAddedfile = new EventEmitter<boolean>();
  @Output() eventComplete = new EventEmitter<boolean>();
  

  private dropzoneInstance!: Dropzone;

  constructor(
    private _store: StoreService,
    private _auth: AuthService
  ) // private upperFirstPipe: UpperFirstPipe
  {
  }

  ngOnInit(): void {

    this.url = `${environment.apiPrivate}/${this._store.name()}/${this.slug}`;
    this.dropzoneId = `dropzone-${this.name}-${Math.floor(
      Math.random() * 1000
    )}`;

    console.log(this.url);
  }

  processQueue(extraParams: any = null) {
    // Agregar parámetros adicionales antes de procesar la cola de archivos

    if (extraParams != null) {
      this.dropzoneInstance.options.params = extraParams;
    }
    this.dropzoneInstance.processQueue();
  }

  ngAfterViewInit(): void {
    
    setTimeout(() => {
      //usamos setTimeOut solo para retrazar ligeramente el tiempo de carga, asi esperamos que el contenedor padre cargue primero, en este caso cuando este componente es llamado desde <app-card-config>
      const self = this; // Guardamos una referencia al componente
      // Dropzone.autoDiscover = false; // Desactivar la auto-detección de Dropzone
      
      this.dropzoneInstance = new Dropzone(`#${this.dropzoneId}`, {

        url: this.url,
        headers: {
          'Authorization': `Bearer ${this._auth.getToken()}`
          // 'X-CSRF-TOKEN': csrfToken, // Actualiza esto según corresponda
        },
        // dictDefaultMessage: `<div>Sube tus archivos aquí</div> <i class="fas fa-camera" style="font-size: 18pt;"></i>`,
        dictDefaultMessage: `<div class="mb-2">${this.name}</div><i class="fas fa-camera" style="font-size: 18pt;"></i>`,
        acceptedFiles: 'image/*',
        // paramName: 'file',
        autoProcessQueue: this.autoProcess,
        maxFiles: this.maxFiles,
        maxFilesize: 10, // Tamaño máximo en MB
        init: function () {

          this.on('success', function (file, resp: any) {

            // console.log('success');
            
            // Manejar la respuesta JSON aquí
            // console.log('Respuesta del servidor:', resp);
            // console.log(resp);

            if (resp.success) {
              // Puedes mostrar un mensaje, actualizar la UI, etc.
              console.log('Archivo subido correctamente:', resp.data);
              self.image = resp.image;
              self.eventUpload.emit(resp.data);
              self.eventSuccess.emit(resp.data);
            } else {
              // self.eventComplete.emit(false);
              self.eventSuccess.emit(false);
              console.error('Error al subir el archivo:', resp.message);
            }
          });

          this.on('sending', (file, xhr, formData) => {
            console.log("sending");
            self.eventSending.emit(true);
            // console.log(file);

            // Agregar parámetros adicionales de forma dinámica
            // formData.append('name', self.name); // Agregar el parámetro 'name'
          });

          this.on('addedfile', (file: File) => {

            console.log("addedfile");
            // console.log(file);
            // console.log(self._auth.getToken());
            // console.log(self.url);
            self.eventAddedfile.emit(true);
            self.eventAddFile.emit(true);

          });

          this.on('complete', (file) => {
            console.log("complete");

            if (file.status != 'error') {
              self.eventComplete.emit(true);
              this.removeFile(file);
            } else {
              self.eventComplete.emit(false);
              this.removeFile(file);
            }

          });

        },
      });
    }, 0);
  }


}
