import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UploadDropzoneComponent } from "../../upload-dropzone/upload-dropzone.component";
import Swal from 'sweetalert2';
import { LoadingCenterComponent } from "../../loading-center/loading-center.component";
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ImageService } from '../../../services/image.service';
import { MediaGalleryItemComponent } from "./media-gallery-item/media-gallery-item.component";

@Component({
  selector: 'app-media-gallery',
  standalone: true,
  imports: [UploadDropzoneComponent, LoadingCenterComponent, CommonModule, MediaGalleryItemComponent],
  templateUrl: './media-gallery.component.html',
  styleUrl: './media-gallery.component.css'
})
export class MediaGalleryComponent implements OnInit, OnDestroy{

  @Input() color_id: number = 0; 
  @Input() shape: string = 'list';  //shape quiere decir forma, he indica la forma en que se mostraran las imagenes, puede ser en forma de lista (defecto) o grid
  @Input() path: string = '';  //luego internamente se le adiciona el create, index, show, segun el uso
  
  loading: boolean = true;
  images: any[] = [];
  ImageSubscription! : Subscription;

  constructor(private _image : ImageService){

  }


  ngOnInit(): void {
    this.loadImages();
  }
  ngOnDestroy(): void {

  } 

  loadImages(){
    this.loading = true;
    this.ImageSubscription = this._image.index(this.path).subscribe((resp:any) => {
      this.loading = false;
      this.images = resp.data;
    });
  }

  fileUpload(event: any){
    console.log(event);
    this.images.unshift(event)
  }

  deleteId(image_id_delete: number){


    console.log('image_id_delete');
    
    console.log(image_id_delete);
    

    this.images = this.images.filter(
      (image: any) => image.id !== image_id_delete
    );

    // const firstImage = this.images.length > 0 ? this.images[0] : null;

    // if (firstImage) {
    //   // Si hay una imagen, puedes trabajar con ella
    //   this.images = firstImage;
    //   console.log('Primera imagen:', firstImage);
    // } else {
    //   // Si no hay ninguna imagen en la lista
    //   console.log('No hay imágenes disponibles');
    // }
  }

  fileTotalUpload(event: boolean){

  }

  errorUpload(event: boolean){
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se subio el archivo',
    }).then((result) => {
      if (result.isConfirmed) {
        
      }
    });
    
  }

}
