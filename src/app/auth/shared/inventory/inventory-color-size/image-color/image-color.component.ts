import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { LoadingComponent } from "../../../../../components/loading/loading.component";
import { ColorService } from '../../../../../services/color.service';
import Swal from 'sweetalert2';
import { DropdownDownloadImagesComponent } from "../../../../../components/buttons/dropdown/dropdown-download-images/dropdown-download-images.component";
import { Fancybox } from '@fancyapps/ui';

@Component({
  selector: 'app-image-color',
  standalone: true,
  imports: [CommonModule, LoadingComponent, DropdownDownloadImagesComponent],
  templateUrl: './image-color.component.html',
  styleUrl: './image-color.component.css'
})
export class ImageColorComponent implements OnInit, OnDestroy{

  @Input() image: any; 
  @Input() color_id: any; 
  @Input() product_id: any; 
  @Output() statusDelete = new EventEmitter<number>();
  loadingDelete: boolean = false;

  constructor(private elRef: ElementRef, private _color: ColorService){

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
  
  deleleImage(image_id: number){

    this.loadingDelete = true; 

    this._color.deleteImage(this.product_id, this.color_id, image_id).subscribe({
      next: (resp:any) => {

        Swal.fire('Eliminado', 'El elemento ha sido eliminado.', 'success');
        this.statusDelete.emit(image_id);

        this.loadingDelete = false; 
      },
      error: (error:any) => {
        console.log(error);
      }
    });
    
  }

  

}
