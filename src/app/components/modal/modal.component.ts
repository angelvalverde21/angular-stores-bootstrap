import { Component, Input, TemplateRef } from '@angular/core';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgbModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {

  @Input() modalTitle : string = "Title"; 
  @Input() buttonTitle : string = "Abrir"; 

  constructor(private modalService: NgbModal) {}

	openVerticallyCentered(content: TemplateRef<any>) {
		this.modalService.open(content, { centered: true });
	}
}
