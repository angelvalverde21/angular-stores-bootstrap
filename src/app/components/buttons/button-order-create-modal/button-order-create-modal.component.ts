import { Component, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AddressFormComponent } from "../../address/address-form/address-form.component";
import { InputGroupComponent } from "../../forms/input-group/input-group.component";
import { ItemColorSizeIndexComponent } from "../../Order/item/item-color-size-index/item-color-size-index.component";
import { InputSearchProductComponent } from "../../product/input-search-product/input-search-product.component";
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from '../../../services/store.service';
import { UserService } from '../../../services/user.service';
@Component({
  selector: 'app-button-order-create-modal',
  standalone: true,
  imports: [AddressFormComponent, InputGroupComponent, ItemColorSizeIndexComponent, InputSearchProductComponent, CommonModule],
  templateUrl: './button-order-create-modal.component.html',
  styleUrl: './button-order-create-modal.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ButtonOrderCreateModalComponent {
  //Esto va en la parte superior, en los imports
  
  product_id: number = 0;
  warehouse_id: number = 0;
  warehouseName: string = "";
  userName: string = "";

	constructor(
		config: NgbModalConfig,
		private modalService: NgbModal,
    private route: ActivatedRoute,
    private _store: StoreService,
    private _user: UserService,

	) {
		// customize default values of modals used by this component tree
		config.backdrop = 'static';
		config.keyboard = false;

    this.route.parent?.params.subscribe((param:any) => {
      this.warehouse_id = param['warehouse_id'];
      this. warehouseName = this._store.warehouses().find((warehouse:any) => warehouse.id == this.warehouse_id).slug;
      this.userName = this._user.info().name;
    });

	}

  openVerticallyCentered(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true, size: 'xl' }, );
  }

  showColor(event:any){
    console.log(event);
    this.product_id = event;
    
  } 

}
