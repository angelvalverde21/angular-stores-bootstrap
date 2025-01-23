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

  logout() {

    localStorage.setItem('access_token', '');
    localStorage.setItem('roles', '');
    localStorage.setItem('user', '');
    // localStorage.setItem('store', '');
    this.router.navigateByUrl(this._store.name() + '/login');
    console.log('logout');

  }

  user(){
    return JSON.parse(localStorage.getItem('user')!); 
  }
  

  login(user: User) {

    console.log(this.url + '/'  + this._store.getName() +  '/login');
    
    
    return this.http.post(this.url + '/'  + this._store.getName() +  '/login', user, this.opciones).pipe(

      map((resp: any) => {
        // this._console.log('entro al RXJS');

        console.log(resp);
      
        const obj = resp.data

        this.setLogin(obj.access_token, obj.user, obj.store);
        // this.guardarToken(resp.data.access_token);
      
        return resp;

      })
    );

  }

  setLogin(token: string, user: {}, store: any){

    this.guardarToken(token);
    localStorage.setItem('user',JSON.stringify(user));
    localStorage.setItem('store', JSON.stringify(store))
    localStorage.setItem('slug_base', store.slug);

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
    return this.http.post(this.url + '/' + this._store.name() + '/izipay/token', order, {
      responseType: 'text',
    });
  }

  registrarPago(dataFromIzipay: any) {
    return this.http.post(this.url + '/' + this._store.name() +  '/izipay/registrarpago', dataFromIzipay, {
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
