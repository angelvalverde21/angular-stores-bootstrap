import { Component } from '@angular/core';
import { StoreService } from '../../../services/store.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-button-orders',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './button-orders.component.html',
  styleUrl: './button-orders.component.css'
})
export class ButtonOrdersComponent {

  store: string = "";

  constructor(private _store: StoreService){

  }

  ngOnInit(): void {
    this.store = this._store.name()!;
  }

}
