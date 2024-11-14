import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { PaymentComponent } from "../Order/payment/payment.component";


@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [CommonModule, PaymentComponent],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.css',
  encapsulation: ViewEncapsulation.None
})
export class StepperComponent implements OnInit, OnDestroy{

  modal: any;

  @Input() order: any; 
  
  
  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
  ) {
  // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  openUploadVoucher(content: TemplateRef<any>) {
    this.modal = this.modalService.open(content, { centered: true });
  }

  openUploadPaymentCourier(content: TemplateRef<any>) {
    this.modal = this.modalService.open(content, { centered: true });
  }


  ngOnInit(): void {


  }
  ngOnDestroy(): void {


  }

  closeModal(){
    this.modal.close();
  }
  

}