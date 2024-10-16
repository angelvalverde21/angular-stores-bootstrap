import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';

import {
  NgbOffcanvas,
  OffcanvasDismissReasons,
  NgbOffcanvasConfig,
} from '@ng-bootstrap/ng-bootstrap';

import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { AuthService } from '../../services/auth.service';
import { PipesModule } from '../../shared/pipes.module';

@Component({
  selector: 'app-button-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule, PipesModule],
  providers: [NgbOffcanvasConfig, NgbOffcanvas],
  templateUrl: './button-sidebar.component.html',
  styleUrl: './button-sidebar.component.css'
})

export class ButtonSidebarComponent implements OnInit, OnDestroy{

  closeResult = '';
  @ViewChild('content', { static: true }) content: any;

  // sidebarOpenSubscription!: Subscription;
  store: string = '';
  menus: any[] = [];
  @Input() name : string = "User"; 
  offCanvasRef: any;

  constructor(
    config: NgbOffcanvasConfig,
    private offcanvasService: NgbOffcanvas,
    private router: Router,
    private _store: StoreService,
    private _auth: AuthService
  ) {
    // customize default values of offcanvas used by this component tree
    config.position = 'start';
    config.keyboard = false;

    this.menus = [
      {
        "name":"MENU",
        "childrens": [
          {
            "name":"Dashboard",
            "icon":"fa-solid fa-house",
            "url":['/', this._store.name(), 'auth', 'dashboard']
          },
          {
            "name":"Products",
            "icon":"fa-solid fa-box-open",
            "url":['/', this._store.name(), 'auth', 'products']
          },
          {
            "name":"Orders",
            "icon":"fa-solid fa-file-lines",
            "url":['/', this._store.name(), 'auth', 'orders']
          },
        ]
      },
      {
        "name":"SETTINGS",
        "childrens": [
          {
            "name":"Settings Store",
            "icon":"fa-solid fa-store",
            "url":['/', this._store.name(), 'auth', 'store', 'settings']
          },
          {
            "name":"Mi Perfil",
            "icon":"fa-solid fa-user",
            "url":['/', this._store.name(), 'auth', 'profile']
          },
          {
            "name":"Notificaciones",
            "icon":"fa-solid fa-bell",
            "url":['/', this._store.name(), 'auth', 'notifications']
          },
          {
            "name":"Soporte",
            "icon":"fa-solid fa-gear",
            "url":['/', this._store.name(), 'auth', 'support']
          },
        ]
      },
    ]

  }
  ngOnDestroy(): void {

  }

  isVisible = false;

  ngOnInit() {


  }

  redirect(url:[]){
    this.router.navigate(url);
    this.closeMenu();
  }

  // closeCanvas() {
  //   this._cart.closeCart();
  // }
  closeMenu(){
    if(this.offCanvasRef){
      console.log("se ejecuto el close");
      
      this.offCanvasRef.close()
    }else{
      console.log("NO se ejecuto el close");
    }
  }

  openCanvas(content: TemplateRef<any>) {
    this.offCanvasRef = this.offcanvasService.open(content, {
      ariaLabelledBy: 'offcanvas-basic-title',
      panelClass: 'custom-sidebar-offcanvas',
    });
  
    this.offCanvasRef.result.then(
      (result:any) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason:any) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    // this.openModal(this.contentModal);

    switch (reason) {
      case OffcanvasDismissReasons.ESC:
        return 'by pressing ESC';
      case OffcanvasDismissReasons.BACKDROP_CLICK:
        return 'by clicking on the backdrop';
      default:
        return `with: ${reason}`;
    }
  }

  logout(){
    this._auth.logout();
  }


}
