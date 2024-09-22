import { Component, inject, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { FormSearchComponent } from "../../form-search/form-search.component";

@Component({
  selector: 'app-button-open-canvas-search',
  standalone: true,
  imports: [FormSearchComponent],
  templateUrl: './button-open-canvas-search.component.html',
  styleUrl: './button-open-canvas-search.component.css'
})
export class ButtonOpenCanvasSearchComponent {

  private offcanvasService = inject(NgbOffcanvas);

  openTop(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { position: 'top' });
	}

}
