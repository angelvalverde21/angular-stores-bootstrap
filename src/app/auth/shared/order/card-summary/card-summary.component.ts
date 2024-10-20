import { Component, Input, OnInit } from '@angular/core';
import { PipesModule } from '../../../../shared/pipes.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-summary',
  standalone: true,
  imports: [PipesModule, CommonModule],
  templateUrl: './card-summary.component.html',
  styleUrl: './card-summary.component.css'
})
export class CardSummaryComponent implements OnInit{

  @Input() items: any; 
  @Input() is_pay: boolean = false; 
  summary: any;

  constructor(){

  }
  ngOnInit(): void {

    const sub_total =  this.items.reduce((sum:number, item:any) => sum + item.price, 0);
    const total =  this.items.reduce((sum:number, item:any) => sum + item.content.price, 0);
    const descuentos = sub_total - total;

    this.summary = {
      "sub_total": sub_total,
      "total_amount": total,
      "descuentos": descuentos
    }
  }
  
}


