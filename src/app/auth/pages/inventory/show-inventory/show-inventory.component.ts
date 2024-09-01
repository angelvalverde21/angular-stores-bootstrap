import { Component } from '@angular/core';
import { HeaderComponent } from '../../../../header/header.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-inventory',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './show-inventory.component.html',
  styleUrl: './show-inventory.component.css'
})
export class ShowInventoryComponent {

  constructor(private _route: ActivatedRoute){
    this._route.params.subscribe((params: any) => {
      console.log(params);
      
    });
  }

}
