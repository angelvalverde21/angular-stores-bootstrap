import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal, NgbModalConfig, NgbModalRef  } from '@ng-bootstrap/ng-bootstrap';
import { ButtonSaveComponent } from "../../../../../components/buttons/button-save/button-save.component";
import { InputGroupComponent } from "../../../../../components/forms/input-group/input-group.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../../../services/product.service';
import { Price } from '../../../../../interfaces/price.interface';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-price-create',
  standalone: true,
  imports: [ButtonSaveComponent, InputGroupComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './product-price-create.component.html',
  styleUrl: './product-price-create.component.css',
  providers: [NgbModalConfig, NgbModal],
})

export class ProductPriceCreateComponent implements OnInit {

  type: string = "";
  formPrice!: FormGroup;
  loadingEdit: boolean = false;
  btnActive: boolean = false;
  success: boolean = false;
  @Input() product_id: number = 0; 
  @Output() emitPrice = new EventEmitter<Price>();
  modalRef: NgbModalRef | undefined;
  quantities: number[] = Array.from({ length: 10 }, (_, i) => i + 3);

	constructor(
		config: NgbModalConfig,
		private modalService: NgbModal,
    private fb: FormBuilder,
    private _product: ProductService
	) {
		// customize default values of modals used by this component tree
		config.backdrop = 'static';
		config.keyboard = false;
	}

  showAlert() {
    Swal.fire({
      title: '¡Éxito!',
      text: 'La operación se realizó con éxito.',
      icon: 'success',
      confirmButtonText: 'Aceptar',
    });
  }
  
  private initForm(): void {
    this.formPrice = this.fb.group({
      type: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      value: ['', [Validators.required]],
      value_total: ['', [Validators.required]],
    });
  }

  setType(event:any){
    console.log(event.target.value);
    if (event.target.value == 'costo') {
      this.formPrice.get('quantity')?.setValue(0);
    }else{
      if (event.target.value == 'normal') {
        this.formPrice.get('quantity')?.setValue(1);
      } else {
        this.formPrice.get('quantity')?.setValue('');
      }
    }
  }

  calPriceMayor(event:any){

    // console.log(event.target.value);
    let price = event.target.value;
    let quantity = this.formPrice.get('quantity')?.value;
    this.formPrice.get('value_total')?.setValue(Number(quantity) * price)

  }

  calPriceUnit(event:any){

    // console.log(event.target.value);
    let priceMayor = event.target.value;
    let quantity = this.formPrice.get('quantity')?.value;
    this.formPrice.get('value')?.setValue(priceMayor/Number(quantity))

  }

  showErrorAlert() {
    Swal.fire({
      title: '¡Error!',
      text: `Ocurrió un error`,
      icon: 'error',
      confirmButtonText: 'Aceptar',
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  open(content: any) {
		this.modalRef = this.modalService.open(content, { centered: true });
	}

  closeModal() {
    if (this.modalRef) {
      this.modalRef.close(); // Cierra el modal
    }
  }


  save() {
    
    this.btnSaveBusy();

    console.log('form enviado');

    this.success = false;

    this._product.savePrice(this.formPrice.value, this.product_id).subscribe({

      next: (resp: any) => {
        console.log(resp);
        this.success = true;
        this.btnSaveReady();
        this.emitPrice.emit(resp.data); //resp.data es el price
        this.closeModal();
        this.showAlert();
      },
      error: (error: any) => {
        console.error(error);
        this.btnSaveReady();
        this.closeModal();
        this.showErrorAlert();
      },

    });
  }

  
  btnSaveReady() {
    this.btnActive = true;
    this.loadingEdit = false;
  }

  btnSaveBusy() {
    this.btnActive = false;
    this.loadingEdit = true;
  }
}
