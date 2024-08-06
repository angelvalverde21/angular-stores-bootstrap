import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouteService } from '../../services/route.service';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.css'
})
export class LogoComponent{

  store: string = "";
  
  constructor(private _routeService: RouteService){
    console.log(this.store + 'desde btn login');
  }
  
  ngOnInit(): void {
    this.store = this._routeService.getStore();
    console.log('Store logo component:', this.store);
  }

}
