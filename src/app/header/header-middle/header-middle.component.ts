import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-header-middle',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header-middle.component.html',
  styleUrl: './header-middle.component.css',
})
export class HeaderMiddleComponent implements OnInit {

  @Input() store: string = ""; 
  
  ngOnInit(): void {

  }
  
}
