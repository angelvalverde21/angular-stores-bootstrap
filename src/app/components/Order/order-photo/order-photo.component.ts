import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DropzoneComponent } from "../../dropzone/dropzone.component";
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { LoadingCenterComponent } from "../../loading-center/loading-center.component";
import { PipesModule } from '../../../shared/pipes.module';
import Swal from 'sweetalert2';
import { OrderService } from '../../../services/order.service';
import { StoreService } from '../../../services/store.service';

@Component({
  selector: 'app-order-photo',
  standalone: true,
  imports: [DropzoneComponent, CommonModule, LoadingCenterComponent, PipesModule],
  templateUrl: './order-photo.component.html',
  styleUrl: './order-photo.component.css'
})
export class OrderPhotoComponent implements OnInit, OnDestroy{

  is_dropzone_valid:boolean = false;

  paymentSubscription! : Subscription;
  deleteSubscription! : Subscription;
  loading: boolean = false;
  overlay: boolean = false;
  @Input() order_id: number = 0;
  @Input() type: number = 1; // 1 es para registrar el pago del cliente, 3 es para registrar el pago que se le hace al courier
  swal: any;
  photos: any[] = [];

  constructor(private _order: OrderService, private _store: StoreService) // private upperFirstPipe: UpperFirstPipe
  {}
  ngOnInit(): void {
    this.load();
  }
  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
  }

  load(){
    this.loading = true;
    this.paymentSubscription = this._order.photoPackageIndex(this.order_id).subscribe((resp:any) => {
      this.photos = resp.data;
      this.loading = false;
      console.log("photos recibidos");
      console.log(this.photos);
      console.log(resp);
    });
  }

  onSubmit(dropzone: DropzoneComponent) {

    this.swal = Swal.fire({
      title: 'Espere...',
      html: 'Estamos cargando el comprobante',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        dropzone.processQueue();
      }
    })

  }

  eliminar(photo_id: number){

    console.log(photo_id);
    this.overlay = true;
    // this.loading = true;
    this.deleteSubscription = this._order.destroy(photo_id, this.order_id).subscribe((resp:any) => {
      // this.loading = false;
      // console.log("payments recibidos");
      console.log("item borrado");
      this.overlay = false;
      this.photos =  this.photos.filter((photo:any) => photo.id !== photo_id);
      
    });

  }

  dropzoneStatus(event:any){

  }

  addPhoto(event:any){
    console.log(event);
    this.photos.unshift(event);

    Swal.fire({
      icon: 'success',
      title: 'Correcto',
      text: 'Subio correctamente',
      confirmButtonText: 'OK',
      showConfirmButton: true
    })
    
  }

  dropzoneValid(event:any){
    this.swal = Swal.fire({
      title: 'Espere...',
      html: 'Estamos cargando el comprobante',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    })
  }
}
