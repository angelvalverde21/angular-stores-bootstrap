import { Component, inject, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-button-filter-inventory',
  standalone: true,
  imports: [],
  templateUrl: './button-filter-inventory.component.html',
  styleUrl: './button-filter-inventory.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class ButtonFilterInventoryComponent {

  private offcanvasService = inject(NgbOffcanvas);

	openTop(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { position: 'top' });
	}
}
