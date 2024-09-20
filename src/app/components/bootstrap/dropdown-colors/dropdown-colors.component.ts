import { Component, Input, inject, TemplateRef  } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from "../../modal/modal.component";
import { UploadDropzoneColorComponent } from "../../upload-dropzone/upload-dropzone-color/upload-dropzone-color.component";

@Component({
  selector: 'app-dropdown-colors',
  standalone: true,
  imports: [RouterModule, NgbModule, ModalComponent, UploadDropzoneColorComponent],
  templateUrl: './dropdown-colors.component.html',
  styleUrl: './dropdown-colors.component.css'
})
export class DropdownColorsComponent {
  @Input() store : string = ""; 
  @Input() product_id : number = 0; 

  
  // private modalService = inject(NgbModal);
	// closeResult = '';
  
	// openModal(content: TemplateRef<any>) {
	// 	this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
	// 		(result:any) => {
	// 			this.closeResult = `Closed with: ${result}`;
  //       console.log(this.closeResult);
        
	// 		},
	// 		(reason:any) => {
  //       this.closeResult = `Dismissed ${reason}`;
  //       console.log(this.closeResult);
	// 		},
	// 	);
	// }


}
