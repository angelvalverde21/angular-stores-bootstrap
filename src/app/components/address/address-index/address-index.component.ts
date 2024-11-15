import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { CardAddressComponent } from '../../../auth/shared/order/card-address/card-address.component';
import { AuthService } from '../../../services/auth.service';
import { AddressCreateModalComponent } from "../../address/address-create-modal/address-create-modal.component";
import { Subscription } from 'rxjs';
import { AddressService } from '../../../services/address.service';
import { LoadingComponent } from "../../loading/loading.component";
@Component({
  selector: 'app-address-index',
  standalone: true,
	imports: [NgbAccordionModule, CommonModule, CardAddressComponent, AddressCreateModalComponent, LoadingComponent],
  templateUrl: './address-index.component.html',
  styleUrl: './address-index.component.css'
})
export class AddressIndexComponent {

  // user: any;
  // addresses: any[] = [];
  seleccionado: number = 0;
  addresesSubscription!: Subscription;
  showAddressIndex: boolean = false;
  showHeaderCard: boolean = false;

  @Output() addressSelected = new EventEmitter<{}>();

  @Input() addresses: any[] = []; 
  @Input() user_id: number | null = null; 
  @Input() addressIdShow: number = 0;  //Este es el address que viene seleccionado por defecto
  
  constructor(private _address: AddressService){

  }

  ngOnInit(): void {


    this.seleccionado = this.addressIdShow;

    if(!this.addresses.length){
      
      console.log("No hay direcciones en el localhost");
      this.showAddressIndex = false;
      //ojo no se incluye el id del usuario en getAll porque esto se ve en en lado del servidor, es decir el usuaio logueado
      this.addresesSubscription = this._address.getAll(this.user_id).subscribe((resp:any) => {
        this.addresses = resp.data;
        this.showAddressIndex = true;
        // console.log(this.addresses[0].id);
        
        this.addressSelected.emit(this.addresses[0])
      });

    }else{
      this.showAddressIndex = true;
    }
    
    // throw new Error('Method not implemented.');
  }
  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
  }

  accordionSelected(value:number){
    this.seleccionado = value;
  }

  //Este recibe desde address-create-modal
  receiveAddress(address: any){
    this.addresses.unshift(address);
    this.addressSelected.emit(address); //SE EMITE AL COMPONENTE PADRE, ejemplo 
  }
}
