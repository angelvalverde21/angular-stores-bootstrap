import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.css'
})
export class LogoComponent{

  store: string = "";
  
  constructor(private _storeService: StoreService, private router: Router){
    // console.log(this.store + 'desde btn login');
  }
  
  ngOnInit(): void {
    this.store = this._storeService.getSlug();
    // console.log('Store logo component:', this.store);
  }

  goHome(){
    
    this.router.navigate(['/', this.store]);

    console.log('click en goHome');
    
  }

}
