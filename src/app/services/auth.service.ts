import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
// import { LogService } from './log.service';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/user.interface';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = environment.apiUrl;
  userToken: string = '';
  roles: any;

  private opciones = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Content-Type': 'application/json; charset=utf-8',
      Accept: 'application/json,text/*;q=0.99',
    }),


  };

  constructor(
    private http: HttpClient, 
    private router: Router,
    private _store: StoreService,
  ) {}

  logout(store: string) {

    localStorage.setItem('access_token', '');
    localStorage.setItem('roles', '');
    localStorage.setItem('user', '');
    // localStorage.setItem('store', '');
    this.router.navigateByUrl(store + '/login');
    console.log('logout');

  }

  user(){
    return JSON.parse(localStorage.getItem('user')!); 
  }
  

  login(user: User) {
    
    return this.http.post(this.url + '/'  + this._store.leerSlugBase() +  '/login', user, this.opciones).pipe(
      map((resp: any) => {
        // this._console.log('entro al RXJS');

        console.log(resp);
        

        this.guardarToken(resp.data.access_token);
        
        localStorage.setItem('user',JSON.stringify(resp.data.user));
        localStorage.setItem('roles',JSON.stringify(resp.data.user.roles));
        // localStorage.setItem('store', JSON.stringify(resp.data.store)) //Esto se carga SlugVerification de (store.service)

        return resp;
      })
    );
  }

  // user() {
  //   return this.http.get(this.url + '/user', this.opciones);
  // }

  private guardarToken(token: string) {
    this.userToken = token;
    localStorage.setItem('access_token', token);
  }

  leerToken() {
    if (localStorage.getItem('access_token')) {
      this.userToken = localStorage.getItem('access_token')!; //el ! le indica que no sera vacio
    } else {
      this.userToken = '';
    }
  }

  getToken() {
    if (localStorage.getItem('access_token')) {
      return localStorage.getItem('access_token')!; //el ! le indica que no sera vacio
    } else {
      return null;
    }
  }

  estaAutenticado(): boolean {
    this.leerToken();
    return this.userToken.length > 2;
  }

  getformToken(order: any) {
    return this.http.post(this.url + '/izipay/token', order, {
      responseType: 'text',
    });
  }

  registrarPago(dataFromIzipay: any) {
    return this.http.post(this.url + '/izipay/registrarpago', dataFromIzipay, {
      responseType: 'text',
    });
  }

  isPartner() {

    if (localStorage.getItem('roles')) {
      //Convierte la cadena
      this.roles = JSON.parse(localStorage.getItem('roles')!); //el ! le indica que no sera vacio

      //hace un bucle similiar al foreach
      const hasSellerRole = this.roles.some((role:any) => role.name === 'seller');

      if (hasSellerRole) {
        // El usuario tiene el rol 'seller'
        return true;
      } else {
        // El usuario no tiene el rol 'seller'
        return false;
      }

    } else {
      return false;
    }
    
  }



}
