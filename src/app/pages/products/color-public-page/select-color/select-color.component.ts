import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { StoreService } from '../../../../services/store.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-select-color',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './select-color.component.html',
  styleUrl: './select-color.component.css'
})
export class SelectColorComponent implements OnInit{

  @Input() colors: any; 
  store: string = "";

  constructor(private _store: StoreService){

  }

  ngOnInit(): void {
    this.store = this._store.name()!;
  }

}
