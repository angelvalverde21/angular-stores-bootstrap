import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreService } from '../../../services/store.service';

@Component({
  selector: 'app-button-products',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './button-products.component.html',
  styleUrl: './button-products.component.css'
})
export class ButtonProductsComponent implements OnInit{

  store: string = "";

  constructor(private _store: StoreService){

  }

  ngOnInit(): void {
    this.store = this._store.name()!;
  }

}
