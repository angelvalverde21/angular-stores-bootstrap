import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { PipesModule } from '../../../../shared/pipes.module';
import { NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputGroupComponent } from "../../../../components/forms/input-group/input-group.component";
import Swal from 'sweetalert2';
import { ItemService } from '../../../../services/item.service';
import { ButtonSaveComponent } from "../../../../components/buttons/button-save/button-save.component";
import { SweetAlertService } from '../../../../services/sweet-alert.service';
import { Subscription } from 'rxjs';
import { CartService } from '../../../../services/cart.service';
import { StoreService } from '../../../../services/store.service';
import { ButtonDotsVerticalComponent } from "../../../../components/button-dots-vertical/button-dots-vertical.component";
import { ButtonIconDeleteComponent } from "../../../../components/button-icon-delete/button-icon-delete.component";

@Component({
  selector: 'app-card-order-item',
  standalone: true,
  imports: [CommonModule, PipesModule, ReactiveFormsModule, InputGroupComponent, ButtonSaveComponent, ButtonDotsVerticalComponent, ButtonIconDeleteComponent],
  templateUrl: './card-order-item.component.html',
  styleUrl: './card-order-item.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class CardOrderItemComponent implements OnInit, OnDestroy {
  @Input() item: any;
  @Input() bg: string = 'secondary';

  loading: boolean = false;
  btnActive: boolean = true;
  subscription! : Subscription;
  modal!: NgbModalRef;

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private _item: ItemService,
    private _sweetAlert: SweetAlertService,
    private _cart: CartService,
    private _store: StoreService,
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  openModal(content: TemplateRef<any>) {
    this.modal = this.modalService.open(content, { centered: true });
  }

  private initForm(): void {

    this.form = this.fb.group({
      price: [this.item.content.price, [Validators.required]],
      size_name_virtual: [this.item.content.size_name_virtual, [Validators.required]],
    });

    // this.form.patchValue(resp.data);
  }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {}

  formIsValid: boolean = false;

  form!: FormGroup;

  formValid(value: boolean) {
    this.formIsValid = value;
  }

  save(){

    this.loading = !this.loading;
    this.btnActive = !this.btnActive;

    this._sweetAlert.showLoading('Espere', 'Espere mientras ingresamos el pedido');

    this.subscription = this._item.save(this.form.value, this.item.order_id, this.item.id).subscribe({

      next: (resp: any) => {

        console.log(resp);
        //Recibiendo valores de la api
        this.item = resp.data;
        
        //Se escribe el valor del item en el localstorage
        this._store.setOrderItem(this.item);
        
        //se actualiza los valores del summary
        this._cart.setSummary();
        //Mostrando un control de sweetAlert2
        this._sweetAlert.showSuccess('Correcto', 'El pedido ha sido registrado');
        //cerrando el modal
        this.closeModal();

        this.loading = !this.loading;
        this.btnActive = !this.btnActive;

      },

      error: (error: any) => {
        this._sweetAlert.showError('Error', 'Ha ocurrido un error al cargar los datos del servidor');
        // console.error('Ha ocurrido un error interno');
        // console.error(error);
      },

    });
  }

  closeModal() {
    this.modal.close();
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
