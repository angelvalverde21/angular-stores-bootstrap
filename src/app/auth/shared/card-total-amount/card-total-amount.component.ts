import { Component, Input, OnInit, TemplateRef, ViewEncapsulation  } from '@angular/core';
import { PipesModule } from '../../../shared/pipes.module';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { InputGroupComponent } from "../../../components/forms/input-group/input-group.component";
import { Subscription } from 'rxjs';
import { PriceService } from '../../../services/price.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { ButtonSaveComponent } from '../../../components/buttons/button-save/button-save.component';

@Component({
  selector: 'app-card-total-amount',
  standalone: true,
  imports: [PipesModule, InputGroupComponent, FormsModule, ButtonSaveComponent],
  templateUrl: './card-total-amount.component.html',
  styleUrl: './card-total-amount.component.css',
  encapsulation: ViewEncapsulation.None
})
export class CardTotalAmountComponent implements OnInit {

  @Input() title: string = "Especifique el titulo"; 
  @Input() type: string = "success"; 
  @Input() height: number = 175; 
  @Input() product_id: number = 0; 
  @Input() stock: number = 0; 
  @Input() price: any; 
  @Input() quantityType: number = 0; //quiere decir el numero si es por 1 es para ventas por menor, 3 es para ventas por mayor y 0 para el precio costo,  
  Subscription! : Subscription;
  amount: number = 0;
  modal: any;

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private _price: PriceService
  ) {
  // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.amount = this.price.value;
  }

  save(){

    this.btnLoading = true;

    this.Subscription = this._price.save(this.product_id, this.amount, this.quantityType).subscribe({
      next: (resp:any) => {
        this.price = resp.data;
        Swal.fire({
          icon: 'success',
          title: 'Correcto',
          text: 'El ' + this.title + ' se actualizo correctamente',
          confirmButtonText: 'OK',
          showConfirmButton: true
        })

        this.modal.close();

            this.btnLoading = false;
        
      },

      error: (err:any) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ha ocurrido un error al actualizar el ' + this.title,
        });

            this.btnLoading = false;
        
      }
    });
  }

  openVerticallyCentered(content: TemplateRef<any>) {
    this.modal = this.modalService.open(content, { centered: true });
  }


  closeModal(){
    this.modal.close();
  }

  btnActive: boolean = true;
  btnLoading: boolean = false;
}



