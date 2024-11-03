import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LoadingCenterComponent } from "../../loading-center/loading-center.component";
import { AddressService } from '../../../services/address.service';
import { AddressIndexComponent } from "../address-index/address-index.component";
import { AddressTemplateComponent } from "../address-template/address-template.component";
import { Subscription } from 'rxjs';
import { AddressFormComponent } from "../address-form/address-form.component";
@Component({
  selector: 'app-address-default',
  standalone: true,
  imports: [CommonModule, LoadingCenterComponent, AddressIndexComponent, AddressTemplateComponent, AddressFormComponent],
  templateUrl: './address-default.component.html',
  styleUrl: './address-default.component.css'
})
export class AddressDefaultComponent {

  @Input() user_id: number | null = null; 
  @Input() address: any; 
  @Input() title: string = "Direccion de envio"; 
  @Input() bg: string  = "secondary"; 
  overlay: boolean = false; 
  showAddressDefault: boolean = true;
  showAddressIndex: boolean = false;
  showAddressForm: boolean = false;
  addresesSubscription! : Subscription;
  addresses: any[] = [];

  constructor(private _address: AddressService){

  }

  change(){

    this.overlay = true;

    console.log("No hay direcciones en el localhost");

    //ojo no se incluye el id del usuario en getAll porque esto se ve en en lado del servidor, es decir el usuaio logueado
    this.addresesSubscription = this._address.getAll(this.user_id).subscribe((resp:any) => {

      this.addresses = resp.data;
      this.showAddressIndex = true;
      console.log(resp);
      this.addresses = resp.data;
      this.showAddressDefault = false;
      this.showAddressIndex = true;
      this.overlay = false;
      // console.log(this.addresses[0].id);

    });

  }
  
  selectAddress(address:any){
    this.overlay = true;
    setTimeout(() => {
      this.address = address;
      this.showAddressIndex = false;
      this.showAddressDefault = true;
      this.showAddressForm = false;
      this.overlay = false;
    },500)
  }

  editAddress(){

  }

  addNewAddress(){

    this.showAddressForm = true;
    this.showAddressIndex = false;
    this.showAddressDefault = false;

    this.overlay = true;

    setTimeout(() => {


      this.overlay = false;

    },500)

  }

}
