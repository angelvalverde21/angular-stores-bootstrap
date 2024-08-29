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
  ngOnInit(): void {
    Dropzone.autoDiscover = false; // Desactivar la auto-detección de Dropzone

    const dropzone = new Dropzone('#my-dropzone', {
      url: '/upload', // Actualiza esto con la URL de tu servidor
      headers: {
        'X-CSRF-TOKEN': 'tu-csrf-token', // Actualiza esto según corresponda
      },
      dictDefaultMessage: `<div>Sube tus archivos aquí</div> <i class="fas fa-camera" style="font-size: 18pt;"></i>`,
      acceptedFiles: 'image/*',
      paramName: 'file',
      maxFilesize: 10, // Tamaño máximo en MB
      init: function () {
        this.on('complete', (file) => {
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
    });
  }
}
