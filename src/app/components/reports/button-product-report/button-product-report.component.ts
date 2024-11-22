import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ReportInventoryComponent } from "../../inventory/report-inventory/report-inventory.component";
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductReportComponent } from "../../products/product-report/product-report.component";

@Component({
  selector: 'app-button-product-report',
  standalone: true,
  imports: [CommonModule, ReportInventoryComponent, NgbDropdownModule, ProductReportComponent],
  templateUrl: './button-product-report.component.html',
  styleUrl: './button-product-report.component.css',
  encapsulation: ViewEncapsulation.None
})

export class ButtonProductReportComponent implements OnInit, OnDestroy{

  @Input() product: any; 
  totalQuantityProduct: number = 0; 
  modal: any;

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
  ) {
  // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }


  openVerticallyCentered(content: TemplateRef<any>) {
    this.modal = this.modalService.open(content, { centered: true });
  }

  ngOnInit(): void {

    console.log(this.product);
    

    if(this.product.sku.warehouse?.pivot != null){
      this.totalQuantityProduct = this.product.sku.warehouse.pivot?.quantity;
    }else{
      if (this.product.sku != null) {
        this.totalQuantityProduct = this.product.sku?.quantity;
      } else {
        this.totalQuantityProduct = 0
      }
    }

  }
  ngOnDestroy(): void {


  }

  closeModal(){
    this.modal.close();
  }
}