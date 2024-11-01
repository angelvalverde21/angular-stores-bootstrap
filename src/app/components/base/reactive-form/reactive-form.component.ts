import { TemplateRef, OnDestroy, Directive } from '@angular/core';
import { NgbModal, NgbModalRef, NgbModalConfig  } from '@ng-bootstrap/ng-bootstrap';

@Directive()
export abstract class ReactiveFormComponent implements OnDestroy {

  modalRef!: NgbModalRef;

  constructor( config: NgbModalConfig, private modalService: NgbModal ) {
		// customize default values of modals used by this component tree
		config.backdrop = 'static';
		config.keyboard = false;
	}

  openModal(content: TemplateRef<any>) {
		this.modalRef = this.modalService.open(content, { centered: true });
	}

  closeModal(){
    this.modalRef.close();
  }

  ngOnDestroy(): void {
    this.closeModal();
  }

}
