import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LogoComponent } from "../../components/logo/logo.component";

@Component({
  selector: 'app-header-middle',
  standalone: true,
  imports: [CommonModule, RouterModule, LogoComponent],
  templateUrl: './header-middle.component.html',
  styleUrl: './header-middle.component.css',
})
export class HeaderMiddleComponent implements OnInit {


  ngOnInit(): void {

  }
  
}
