import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouteService } from '../../../services/route.service';

@Component({
  selector: 'app-button-login',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './button-login.component.html',
  styleUrl: './button-login.component.css'
})
export class ButtonLoginComponent implements OnInit {

  store: string = '/'; 
  
  constructor(private _routeService: RouteService){
    console.log(this.store + 'desde btn login');
  }
  
  ngOnInit(): void {
    this.store = this._routeService.getStore();
    console.log('Store from service:', this.store);
  }
  
}
