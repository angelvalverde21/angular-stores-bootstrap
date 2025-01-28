import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { StoreService } from './services/store.service';

declare var $: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})
export class AppComponent implements OnInit{

  constructor(private route: ActivatedRoute, private _store: StoreService) {

    console.log("app component ejecutando");
    

    console.log("AppComponent ejecutando");

    this.route.firstChild?.params.subscribe((params) => {
      const store = params['store'];
      console.log('Store desde la URL base:', store);
    });

    // this._store.setName(this.route.params['store']);

  }

  ngOnInit(): void {

  }

}
