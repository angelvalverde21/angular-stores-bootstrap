import { Component, inject, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AddressFormComponent } from "../../address/address-form/address-form.component";
import { OrderItemSearchComponent } from "../../Order/item/order-item-search/order-item-search.component";
import { InputGroupComponent } from "../../forms/input-group/input-group.component";
import { ItemColorSizeIndexComponent } from "../../Order/item/item-color-size-index/item-color-size-index.component";
@Component({
  selector: 'app-button-order-create-modal',
  standalone: true,
  imports: [AddressFormComponent, OrderItemSearchComponent, InputGroupComponent, ItemColorSizeIndexComponent],
  templateUrl: './button-order-create-modal.component.html',
  styleUrl: './button-order-create-modal.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ButtonOrderCreateModalComponent {
  //Esto va en la parte superior, en los imports
  
  product_id: number = 0;

	constructor(
		config: NgbModalConfig,
		private modalService: NgbModal,
	) {
		// customize default values of modals used by this component tree
		config.backdrop = 'static';
		config.keyboard = false;
	}

  openVerticallyCentered(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true, size: 'xl' }, );
  }
}
