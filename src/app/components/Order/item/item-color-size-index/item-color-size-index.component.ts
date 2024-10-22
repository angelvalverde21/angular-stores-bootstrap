import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-color-size-index',
  standalone: true,
  imports: [],
  templateUrl: './item-color-size-index.component.html',
  styleUrl: './item-color-size-index.component.css'
})
export class ItemColorSizeIndexComponent implements OnInit, OnDestroy{

  @Input() product_id: number = 0; 
  

  constructor(){

  }

  ngOnInit(): void {

  }
  ngOnDestroy(): void {

  }

}
