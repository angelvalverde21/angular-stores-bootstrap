import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal, NgbModalConfig, NgbModalRef  } from '@ng-bootstrap/ng-bootstrap';
import { ButtonSaveComponent } from "../../../../../components/buttons/button-save/button-save.component";
import { InputGroupComponent } from "../../../../../components/forms/input-group/input-group.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../../../services/product.service';
import { Price } from '../../../../../interfaces/price.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-price-create',
  standalone: true,
  imports: [ButtonSaveComponent, InputGroupComponent, ReactiveFormsModule],
  templateUrl: './product-price-create.component.html',
  styleUrl: './product-price-create.component.css',
  providers: [NgbModalConfig, NgbModal],
})

export class ProductPriceCreateComponent implements OnInit {

  formPrice!: FormGroup;
  loadingEdit: boolean = false;
  btnActive: boolean = false;
  success: boolean = false;
  @Input() product_id: number = 0; 
  @Output() emitPrice = new EventEmitter<Price>();
  modalRef: NgbModalRef | undefined;

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
  
  private initForm(): void {
    this.formPrice = this.fb.group({
      type: ['', [Validators.required]],
      quantity: [''],
      value: [''],
      value_total: [''],
    });
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
