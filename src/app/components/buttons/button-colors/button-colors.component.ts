import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreService } from '../../../services/store.service';

@Component({
  selector: 'app-button-colors',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './button-colors.component.html',
  styleUrl: './button-colors.component.css'
})
export class ButtonColorsComponent {
  store: string = "";

  constructor(private _store: StoreService){

  }

  ngOnInit(): void {
    this.store = this._store.name()!;
  }
}
