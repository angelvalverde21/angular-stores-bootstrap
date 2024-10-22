import { Component, inject, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddressFormComponent } from "../../address/address-form/address-form.component";
@Component({
  selector: 'app-button-order-create-modal',
  standalone: true,
  imports: [AddressFormComponent],
  templateUrl: './button-order-create-modal.component.html',
  styleUrl: './button-order-create-modal.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ButtonOrderCreateModalComponent {
  //Esto va en la parte superior, en los imports
  
  private modalService = inject(NgbModal);
  openVerticallyCentered(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true });
  }
}
