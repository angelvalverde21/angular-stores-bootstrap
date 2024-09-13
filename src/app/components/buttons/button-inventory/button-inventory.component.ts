import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreService } from '../../../services/store.service';
import { PipesModule } from '../../../shared/pipes.module';

@Component({
  selector: 'app-button-inventory',
  standalone: true,
  imports: [CommonModule, RouterModule, PipesModule],
  templateUrl: './button-inventory.component.html',
  styleUrl: './button-inventory.component.css'
})
export class ButtonInventoryComponent implements OnInit{
  
  store: any;

  constructor(private _storeWarehouse: StoreService){

  }

  ngOnInit(): void {
    this.store = JSON.parse(this._storeWarehouse.storeWarehouses()!);
    console.log(this.store);
    
  }

}
