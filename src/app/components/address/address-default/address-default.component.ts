import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoadingCenterComponent } from "../../loading-center/loading-center.component";
import { AddressService } from '../../../services/address.service';
import { AddressIndexComponent } from "../address-index/address-index.component";
import { AddressTemplateComponent } from "../address-template/address-template.component";
import { Subscription } from 'rxjs';
import { AddressFormComponent } from "../address-form/address-form.component";

/* formularios */
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-address-default',
  standalone: true,
  imports: [CommonModule, LoadingCenterComponent, AddressIndexComponent, AddressTemplateComponent, AddressFormComponent, ReactiveFormsModule],
  templateUrl: './address-default.component.html',
  styleUrl: './address-default.component.css'
})
export class AddressDefaultComponent implements OnInit{

  @Input() user_id: number | null = null; 
  @Input() address: any; 
  @Input() title: string = "Direccion de envio"; 
  @Input() bg: string  = "secondary"; 

  @Output() eventAddress = new EventEmitter<[]>();
  

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

  constructor(private _address: AddressService, private fb: FormBuilder,){

  }

  ngOnInit(): void {
  
    this.form = this.fb.group({
      address: {},
    });    

    //sino se recibe un address por el input...
    if (this.address != null) {
      this.setViewState('default'); 
    }else{
      //... entonces mostramos el formulario para registrar un nuevo Address
      this.setViewState('create');
    }

  }

  createNewAddress(){

    console.log(this.form.value);
    this.overlay = true;

    this.addresesUpdateSubscription = this._address.create(this.form.value.address, this.user_id).subscribe((resp:any) => {

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

    this.addresesUpdateSubscription = this._address.update(this.form.value.address, this.address.id, this.user_id).subscribe((resp:any) => {

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
    this.addresesSubscription = this._address.getAll(this.user_id).subscribe((resp:any) => {

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

  

}
