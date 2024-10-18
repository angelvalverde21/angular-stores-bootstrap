import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { LogoComponent } from "../../components/logo/logo.component";

@Component({
  selector: 'app-header-middle',
  standalone: true,
  imports: [CommonModule, RouterModule, LogoComponent],
  templateUrl: './header-middle.component.html',
  styleUrl: './header-middle.component.css',
})
export class HeaderMiddleComponent implements OnInit {

  @Input() store: string = ""; 
  
  ngOnInit(): void {

  }
  
}
