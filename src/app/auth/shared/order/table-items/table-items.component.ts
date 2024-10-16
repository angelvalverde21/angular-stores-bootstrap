import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PipesModule } from '../../../../shared/pipes.module';

@Component({
  selector: 'app-table-items',
  standalone: true,
  imports: [CommonModule, PipesModule],
  templateUrl: './table-items.component.html',
  styleUrl: './table-items.component.css'
})
export class TableItemsComponent {

  @Input() items: any[] = []; 
  @Input() bg: string  = "secondary"; 

  converToNumber(value: number){
    return Number(value);
  }

}
