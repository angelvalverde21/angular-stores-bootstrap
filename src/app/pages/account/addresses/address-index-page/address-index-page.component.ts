import { Component } from '@angular/core';
import { HeaderComponent } from "../../../../header/header.component";
import { LoadingCenterComponent } from "../../../../components/loading-center/loading-center.component";
import { BreadCrumbComponent } from "../../../../auth/shared/bread-crumb/bread-crumb.component";
import { AddressIndexComponent } from "../../../../components/address/address-index/address-index.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-address-index-page',
  standalone: true,
  imports: [HeaderComponent, LoadingCenterComponent, BreadCrumbComponent, AddressIndexComponent, CommonModule],
  templateUrl: './address-index-page.component.html',
  styleUrl: './address-index-page.component.css'
})
export class AddressIndexPageComponent {

  loading: boolean = false;

}
