import { Component, EventEmitter, Input, OnInit, Output, inject, TemplateRef, ViewEncapsulation  } from '@angular/core';
import { LoadingCenterComponent } from "../../loading-center/loading-center.component";
import { AddressTemplateComponent } from "../../address/address-template/address-template.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
// import { AddressService } from '../../../services/address.service';
import { Subscription } from 'rxjs';
import { AddressFormComponent } from "../../address/address-form/address-form.component";
import { CourierService } from '../../../services/courier.service';

import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
// import Swal from 'sweetalert2';

@Component({
  selector: 'app-courier-default',
  standalone: true,
  imports: [LoadingCenterComponent, AddressTemplateComponent, CommonModule, ReactiveFormsModule, AddressFormComponent],
  templateUrl: './courier-default.component.html',
  styleUrl: './courier-default.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class CourierDefaultComponent  implements OnInit{


  courier_id: number | null = null; 
  address: any; 
  @Input() courier_address: any; 
  @Input() title: string = "Transporte"; 
  @Input() bg: string  = "secondary"; 
  @Input() logo: string  = "https://placehold.co/400x400"; 

  @Output() eventAddress = new EventEmitter<[]>();
  @Output() eventSelectCourier = new EventEmitter<[]>();
  

  overlay: boolean = false; 

  showAddressDefault: boolean = false;
  showAddressIndex: boolean = false;
  showCreateAddress: boolean = true;
  showEditAddress: boolean = false;

  addresesSubscription! : Subscription;
  addresesUpdateSubscription! : Subscription;
  addresses: any[] = [];

  /* formulario */

  form!: FormGroup; //Para los formularios reactivos
  formIsValid: boolean = false;

  constructor(
    private _courier: CourierService, 
    private fb: FormBuilder,
    config: NgbModalConfig,
    private modalService: NgbModal,
  ){
    config.backdrop = 'static';
    config.keyboard = false;
  
  }

  modal: any;

  ngOnInit(): void {

    // this.logo = this.courier_address.courier.profile_photo_url;
    this.courier_id = this.courier_address.courier.id;
    // this.address = this.courier_address;
    this.form = this.fb.group({
      address: {},
    });    

    //sino se recibe un address por el input...
    if (this.courier_address != null) {
      this.setViewState('default'); 
    }else{
      //... entonces mostramos el formulario para registrar un nuevo Address
      this.setViewState('create');
    }

  }

  createNewAddress(){

    console.log(this.form.value);
    this.overlay = true;

    this.addresesUpdateSubscription = this._courier.createAddress(this.form.value.address, this.courier_id).subscribe((resp:any) => {

      this.address = resp.data;
      console.log(resp);

      this.setViewState('default');
      this.eventAddress.emit(resp.data);
      this.addresses = resp.data;
      this.overlay = false;
      // console.log(this.addresses[0].id);

    });

  }

  updateAddress(){

    console.log(this.form.value);
    this.overlay = true;

    this.addresesUpdateSubscription = this._courier.updateAddress(this.form.value.address, this.address.id, this.courier_id).subscribe((resp:any) => {

      this.address = resp.data;
      console.log(resp);

      this.setViewState('default');
      this.eventAddress.emit(resp.data);
      this.addresses = resp.data;
      this.overlay = false;
      // console.log(this.addresses[0].id);

    });

  }

  /*estados*/

  setViewState(view: 'index' | 'default' | 'edit' | 'create') {

    this.showAddressDefault = view === 'default';
    this.showAddressIndex = view === 'index';
    this.showCreateAddress = view === 'create';
    this.showEditAddress = view === 'edit';

  }

  formValid(value: boolean) {
    console.log(value);
    
    this.formIsValid = value;
  }

  /* funciones de apertura y listado de addresses  */

  fnShowAddressIndex(){

    this.overlay = true;

    console.log("No hay direcciones en el localhost");

    //ojo no se incluye el id del usuario en getAll porque esto se ve en en lado del servidor, es decir el usuaio logueado
    this.addresesSubscription = this._courier.getAllAddress(this.courier_id).subscribe((resp:any) => {

      this.addresses = resp.data;
      console.log(resp);

      this.setViewState('index');

      this.addresses = resp.data;
      this.overlay = false;
      // console.log(this.addresses[0].id);

    });

  }
  
  fnShowAddressDefault(address:any){

    this.overlay = true;

    setTimeout(() => {

      this.address = address;
      this.overlay = false;
      this.eventAddress.emit(address);
      this.setViewState('default');  

    },500)

  }

  fnShowEditAddress(address:any){

    // this.formIsValid = true;

    this.address = address; //esto servira paque se pueda usar el address.id en el updateAddress

    this.form.patchValue({
      address: {
        "name":address.name,
        "phone":address.phone,
        "dni":address.dni,
        "primary":address.primary,
        "secondary":address.secondary,
        "references":address.references,
        "district_id":address.district_id,
      }
    });

    this.overlay = true;

    setTimeout(() => {

      this.setViewState('edit');  
      this.overlay = false;

    },500)

  }

  fnShowCreateAddress(){

    this.form.reset();

    // this.formIsValid = false;

    // this.form = this.fb.group({
    //   address: [],
    // });

    this.overlay = true;

    setTimeout(() => {

      this.setViewState('create');  
      this.overlay = false;

    },500)

  }

  success: boolean = false;
  loadingCourier: boolean = true;
  couriers: any;

  couriersLoad(){
    this._courier.index().subscribe( (resp:any) => {
      console.log(resp);
      this.couriers = resp.data;
      this.loadingCourier = false;
    });
  }

  openModal(content: TemplateRef<any>) {

    this.couriersLoad(); 

    this.modal = this.modalService.open(content, { centered: true, size: 'lg' });

  }

  closeModal(){
    this.modal.close();
  }

  selectCourier(courier: any){

    console.log(courier);
    
    this.eventSelectCourier.emit(courier);
    
  }

}


