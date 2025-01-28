import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.css'
})
export class LogoComponent{

  store: string = "";
  
  
  constructor(
    private router: Router,
    private _store: StoreService
  ){
    // console.log(this.store + 'desde btn login');
    this.store = this._store.getName();
  }
  
  ngOnInit(): void {
    // this.store = this._storeService.getSlug();
    // console.log('Store logo component:', this.store);
  }

  goHome(){
    
    this.router.navigate(['/', this.store]);

    console.log('click en goHome');
    
  }

}
