import { Component, EventEmitter, Input, OnInit, Output, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ButtonLoginComponent } from "../../components/buttons/button-login/button-login.component";
import { CommonService } from '../../services/common.service';
import { FormSearchComponent } from "../../components/form-search/form-search.component";
import { PipesModule } from '../../shared/pipes.module';

@Component({
  selector: 'app-header-bottom',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonLoginComponent, FormSearchComponent, PipesModule],
  templateUrl: './header-bottom.component.html',
  styleUrl: './header-bottom.component.css'
})
export class HeaderBottomComponent implements OnInit{

  showSearch: boolean = false;

  @Input() store: string = ""; 
  @Input() estaAutenticado: boolean = false; 
  @Input() user: any; 
  @Output() statusShowSearch = new EventEmitter<boolean>();
  
  constructor(private _auth: AuthService, private _common: CommonService,){

  }

  logout(){
    this._auth.logout(this.store);
  }

  ngOnInit(): void {
    this._common.getShowSearchObservable().subscribe((value: boolean) => {
      this.showSearch = value;
      console.log('escuche el valor seteado y es ' + value);
    });
  
  }
  
  openSearch() {
    console.log('click open search');
    this.showSearch = !this.showSearch;
    this.statusShowSearch.emit(this.showSearch);
  }

}
