import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductCreateModalComponent } from "../../../auth/shared/products/product-create-modal/product-create-modal.component";
import { StoreService } from '../../../services/store.service';

@Component({
  selector: 'app-dropdown-auth-home',
  standalone: true,
  imports: [RouterModule, NgbModule, ProductCreateModalComponent],
  templateUrl: './dropdown-auth-home.component.html',
  styleUrl: './dropdown-auth-home.component.css'
})
export class DropdownAuthHomeComponent {

  @Input() store : string = ""; 
  
  constructor(private _store: StoreService){
    this._store.getNameObservable().subscribe((resp:any) => {
      this.store = resp;
    });
  }
}