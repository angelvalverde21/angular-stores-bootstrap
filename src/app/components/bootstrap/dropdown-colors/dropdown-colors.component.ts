import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from "../../modal/modal.component";

@Component({
  selector: 'app-dropdown-colors',
  standalone: true,
  imports: [RouterModule, NgbModule, ModalComponent],
  templateUrl: './dropdown-colors.component.html',
  styleUrl: './dropdown-colors.component.css'
})
export class DropdownColorsComponent {
  @Input() store : string = ""; 
}
