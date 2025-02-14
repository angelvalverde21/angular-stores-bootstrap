import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { DropdownDownloadImagesComponent } from "../../../buttons/dropdown/dropdown-download-images/dropdown-download-images.component";
import { LoadingComponent } from "../../../loading/loading.component";
import { Fancybox } from '@fancyapps/ui';
import Swal from 'sweetalert2';
import { ImageService } from '../../../../services/image.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-media-gallery-item',
  standalone: true,
  imports: [DropdownDownloadImagesComponent, LoadingComponent, CommonModule],
  templateUrl: './media-gallery-item.component.html',
  styleUrl: './media-gallery-item.component.css'
})
export class MediaGalleryItemComponent {

  @Input() path: string = ''; 
  @Input() image: any; 
  @Input() color_id: any; 
  @Input() product_id: any; 
  @Output() deleteId = new EventEmitter<number>();
  loadingDelete: boolean = false;

  constructor(private elRef: ElementRef, private _image: ImageService){

  }

  ngOnDestroy(): void {
    Fancybox.unbind(this.elRef.nativeElement);
    Fancybox.close();
  }

  ngOnInit(): void {
    Fancybox.bind(this.elRef.nativeElement, '[data-fancybox]', {
      // Custom options
    });
  }
  

  deleteByUrl(){

    this.loadingDelete = true; 

    this._image.destroy(this.path + '/' + this.image.id).subscribe({
      next: (resp:any) => {

        Swal.fire('Eliminado', 'El elemento ha sido eliminado.', 'success');
        // this.deleteId.emit(resp.id);
        console.log('respuesta de deleteByUrl');
        
        this.deleteId.emit(resp.data.id);

        this.loadingDelete = false; 

      },
      error: (error:any) => {
        console.log(error);
      }
    });

  }

}

