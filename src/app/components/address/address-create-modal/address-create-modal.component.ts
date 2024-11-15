import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AddressFormComponent } from "../address-form/address-form.component";
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AddressService } from '../../../services/address.service';

@Component({
  selector: 'app-address-create-modal',
  standalone: true,
  imports: [AddressFormComponent, ReactiveFormsModule],
  templateUrl: './address-create-modal.component.html',
  styleUrl: './address-create-modal.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class AddressCreateModalComponent {

  private modalService = inject(NgbModal);
  address: any;
  addressSubcription!:  Subscription;
  saving = false; 
  
  @Output() emitAddress = new EventEmitter<[]>();

  @Input() user_id: number = 0; 
  
  formChildrenIsValid: boolean = false;
  modalRef: any;
  constructor(
    private fb: FormBuilder,
    private _address: AddressService
  ){}

  
  ngOnInit(): void {
    this.form = this.fb.group({
      address: [],
    });
  }

  form!: FormGroup;

  formValid(value: boolean) {
    this.formChildrenIsValid = value;
  }

  addressCreate(){

    this.saving = true;

    console.log(this.form.value.address);

    this.addressSubcription = this._address.create(this.form.value.address).subscribe((resp:any) => {

      this.address = resp.data;
      console.log(this.address);
      this.emitAddress.emit(this.address);

      this.saving = false;

      this.closeModal();

    });
  }

  closeModal(){
    if(this.modalRef){
      this.modalRef.close(); //cierra el modal abierto
    }
  }

  openVerticallyCentered(content: TemplateRef<any>) {
		this.modalRef = this.modalService.open(content, { centered: true });
	}

}
