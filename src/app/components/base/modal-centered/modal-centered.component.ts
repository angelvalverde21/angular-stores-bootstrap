import { Component, OnDestroy, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StoreService } from '../../../services/store.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { SweetAlertService } from '../../../services/sweet-alert.service';

@Component({
  selector: 'app-modal-centered',
  standalone: true,
  imports: [],
  templateUrl: './modal-centered.component.html',
  styleUrl: './modal-centered.component.css',
  encapsulation: ViewEncapsulation.None,
  providers: [NgbModalConfig, NgbModal],
})
export class ModalCenteredComponent implements OnDestroy, OnInit{

  modalRef!: NgbModalRef;
  subscription! : Subscription;

  form!: FormGroup; //Para los formularios reactivos
  formIsValid: boolean = false;

  constructor(
		config: NgbModalConfig,
		private modalService: NgbModal,
    private fb: FormBuilder,
    private _store: StoreService,
    private router: Router,
    private _sweetAlert: SweetAlertService
	) {
		// customize default values of modals used by this component tree
		config.backdrop = 'static';
		config.keyboard = false;
	}

  /***************** formularios ********************/


  ngOnInit(): void {
    this.initForm(); //inicial el formulario
  }

  private initForm(): void {

    this.form = this.fb.group({
      name: ['', [Validators.required]],
      body: [''],
      tags: [''],
      price: ['', [Validators.required]],
      category_id: ['', [Validators.required]],
      sizes: ['', [Validators.required]],
    });

  }

  //Forma de guardar 

  save(){

    this._sweetAlert.showLoading('Espere', 'Espere mientras ingresamos el pedido');


    this.subscription = this._warehouseOrder.save(this.form.value).subscribe({

      next: (resp: any) => {

        // console.log(resp);
        //Recibiendo valores de la api
        const arrayResp = resp.data;
        //Mostrando un control de sweetAlert2
        this._sweetAlert.showSuccess('Correcto', 'El pedido ha sido registrado');
        //cerrando el modal
        this.closeModal();
        //Redireccionando
        this.router.navigate(['/',this._store.name(),'campo',arrayResp.order_id]);

      },
      error: (error: any) => {
        this._sweetAlert.showError('Error', 'Ha ocurrido un error en el servidor');
        console.error('Ha ocurrido un error interno');
        console.error(error);
      },

    });
  }

  formValid(value: boolean) {
    this.formIsValid = value;
  }

  /***************** modal ********************/

  openModal(content: TemplateRef<any>) {
		this.modalRef = this.modalService.open(content, { centered: true });
	}

  closeModal(){
    this.modalRef.close();
  }

  ngOnDestroy(): void {
    this.closeModal();

    if (this.subscription) {
        this.subscription.unsubscribe();
    }
  }

  async eliminar() {

    const isConfirmed = await this._sweetAlert.confirmDeletion(
      '¿Estás seguro?',
      'No podrás deshacer esta acción'
    );

    if (isConfirmed) {
      // Acción para eliminar el elemento
      this._sweetAlert.showDeletionSuccess(
        'Eliminado!',
        'El elemento ha sido eliminado.'
      );
      // Aquí puedes incluir la lógica para eliminar el elemento
    }
  }

}
