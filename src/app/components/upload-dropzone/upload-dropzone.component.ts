import { Component } from '@angular/core';
import Dropzone from 'dropzone';

@Component({
  selector: 'app-upload-dropzone',
  standalone: true,
  imports: [],
  templateUrl: './upload-dropzone.component.html',
  styleUrl: './upload-dropzone.component.css',
})
export class UploadDropzoneComponent {

  dropzoneConfig = {
    url: '/upload', // Actualiza esto con la URL de tu servidor
    headers: {
      'X-CSRF-TOKEN': 'tu-csrf-token', // Actualiza esto según corresponda
    },
    dictDefaultMessage: `<div>Sube tus archivos aquí</div> <i class="fas fa-camera mt-5" style="font-size: 18pt;"></i>`,
    acceptedFiles: 'image/*',
    paramName: 'file',
    maxFilesize: 10, // Tamaño máximo en MB
    init: function () {
      this.on('complete', function (file) {
        this.removeFile(file);
      });
      this.on('queuecomplete', function () {
        console.log('Todos los archivos han sido subidos');
      });
      this.on('accept', function (file, done) {
        if (file.name === 'justinbieber.jpg') {
          done('No puedes subir este archivo.');
        } else {
          done();
        }
      });
    },
  };

  ngOnInit(): void {
    const dropzone = new Dropzone('#my-dropzone', {
      url: '/upload', // Configura la URL de subida
      // Otras configuraciones de Dropzone
    });
  }
}
