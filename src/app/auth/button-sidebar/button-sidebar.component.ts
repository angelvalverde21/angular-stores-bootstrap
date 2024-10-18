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
  estaAutenticado: boolean = false;

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
        "name":"CATALOGO",
        "protected" : false,
        "childrens": [
          {
            "name":"Buscar",
            "icon":"fa-solid fa-magnifying-glass",
            "url":['/', this._store.name(), '/', 'profile']
          },
          {
            "name":"Home",
            "icon":"fa-solid fa-house",
            "url":['/', this._store.name()]
          },
          {
            "name":"Categorias",
            "icon":"fa-solid fa-user",
            "url":['/', this._store.name(), 'auth', 'profile']
          },
        ]
      },

      {
        "name":"MI CUENTA",
        "protected" : true,
        "childrens": [
          {
            "name":"Dashboard",
            "icon":"fa-solid fa-house",
            "url":['/', this._store.name(), 'auth', 'dashboard']
          },
          {
            "name":"Mis pedidos",
            "icon":"fa-solid fa-file-lines",
            "url":['/', this._store.name(), 'auth', 'orders']
          },
          {
            "name":"Mis Direcciones",
            "icon":"fa-solid fa-file-lines",
            "url":['/', this._store.name(), 'auth', 'orders']
          },
          {
            "name":"Notificaciones",
            "icon":"fa-solid fa-bell",
            "url":['/', this._store.name(), 'auth', 'notifications']
          },
          {
            "name":"Mi Perfil",
            "icon":"fa-solid fa-user",
            "url":['/', this._store.name(), 'auth', 'profile']
          },
          {
            "name":"Soporte",
            "icon":"fa-solid fa-gear",
            "url":['/', this._store.name(), 'auth', 'support']
          },
        ]
      },
      {
        "name":"MI STORE",
        "protected" : true,
        "childrens": [
          {
            "name":"Settings",
            "icon":"fa-solid fa-store",
            "url":['/', this._store.name(), 'auth', 'store', 'settings']
          },
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
            "name":"Categorias",
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
        "name":"MI CUENTA",
        "protected" : true,
        "childrens": [
          {
            "name":"Mi Perfil",
            "icon":"fa-solid fa-user",
            "url":['/', this._store.name(), 'auth', 'profile']
          },

        ]
      },
    ]

  }
  ngOnDestroy(): void {

  }

  isVisible = false;

  ngOnInit() {
    this.estaAutenticado = this._auth.estaAutenticado();
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
