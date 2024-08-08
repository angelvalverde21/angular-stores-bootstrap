import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  //private url = 'https://3b.pe/api/v1/ara/products';
  private url_base = environment.apiUrl;
  private url = environment.apiUrl + '/products';

  constructor( private http: HttpClient) {

  }

  private slug: string = "";

  setSlug(slug: string): void {
    this.slug = slug;
  }

  getSlug(): string {
    return this.slug;
  }
  
  getHome(store: string): Observable<any> {

    // Construye la URL con el parámetro 'nombre'
    const url = `${this.url_base}/${store}`;
    // const url = `${this.url_base}?store=${store}`;
    // console.log(url);
    
    return this.http.get(url);

  }

  verifyStore(store: string): Observable<any> {

    // Construye la URL con el parámetro 'nombre'
    const url = `${this.url_base}/${store}/verify`;
    // const url = `${this.url_base}?store=${store}`;
    // console.log(url);
    
    return this.http.get(url);

  }

  // verifyStore(storeName: string): Observable<boolean> {
  //   return this.http.get<{status: number, success: boolean, message: string, error?: any}>(`${this.url_base}/${storeName}`).pipe(
  //     map(response => response.success), // Retorna true si `success` es true
  //     catchError(() => of(false)) // Maneja errores de manera adecuada
  //   );
  // }

}