import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { RouteService } from '../services/route.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css'
})
export class StoreComponent implements OnInit {

  store: string = "";
  
  constructor(private route: ActivatedRoute, private _routeService: RouteService) {}


  ngOnInit(): void {
    
    this.route.paramMap.subscribe(params => {
      const store = params.get(environment.parametroBase); //el parametro base es store
      if (store) {
        this._routeService.setStore(store);
      }
    });

  }

}
