import { Component } from '@angular/core';
import { AddressFormComponent } from "../address-form/address-form.component";

@Component({
  selector: 'app-address-create',
  standalone: true,
  imports: [AddressFormComponent],
  templateUrl: './address-create.component.html',
  styleUrl: './address-create.component.css'
})
export class AddressCreateComponent {

}
