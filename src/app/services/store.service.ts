import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  //private url = 'https://3b.pe/api/v1/ara/products';
  private url_base = environment.apiUrl;
  private url = environment.apiUrl + '/products';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {

  }

  // private slug: string = "";

  /*
  setSlugBase(): Observable<any> {

    return this.route.params.pipe(
      switchMap((params) => {
        const slugBase = params[environment.parametroBase];

        if (!slugBase) {
          return of(null);
        }

        if (localStorage.getItem('slug_base') === null || localStorage.getItem('slug_base') !== slugBase) {
          return this.SlugVerification(slugBase);
        } else {
          return of(null);
        }
      })
    );

  }

  private SlugVerification(slugBase: string): Observable<any> {
    return this.verifyStore(slugBase).pipe(
      switchMap((resp: any) => {
        localStorage.setItem('slug_base', slugBase);
        return of(resp);
      }),
      catchError((err: any) => {
        this.router.navigate(['/', slugBase, 'error-404']);
        console.error('El nombre de la tienda ' + slugBase + ' no existe:', err);
        return of(null); // Devuelve un observable vacío para manejar el error
      })
    );
  }
*/

  setSlugBase(slugBase: string): Observable<any> {
    // return this.route.snapshot.paramMap.get(environment.parametroBase);

    // const slugBase = this.route.snapshot.paramMap.get(environment.parametroBase);

    console.log('Impresión desde la función setSlugBase: ' + slugBase);
  
    if (!slugBase) {
      return of(null);
    }
  
    if (
      localStorage.getItem('slug_base') === null ||
      localStorage.getItem('slug_base') !== slugBase
    ) {
      return this.SlugVerification(slugBase);
    } else {
      return of(null);
    }

  }

  SlugVerification(slugBase: string): Observable<any> {

    return this.verifyStore(slugBase).pipe(
      switchMap((resp: any) => {
        console.log('se ha seteado el slug_base ' + slugBase);
        
        localStorage.setItem('slug_base', slugBase);
        return of(resp);
      }),
      catchError((err: any) => {
        this.router.navigate(['/', slugBase, 'error-404']);
        console.error(
          'El nombre de la tienda ' + slugBase + ' no existe:',
          err
        );
        return of(null); // Devuelve un observable vacío para manejar el error
      })
    );
    
  }

  getSlug(): string {
    return localStorage.getItem('slug_base')!;
  }

  getHome(store: string): Observable<any> {
    // Construye la URL con el parámetro 'nombre'
    const url = `${this.url_base}/${store}`;
    // const url = `${this.url_base}?store=${store}`;
    // console.log(url);

    return this.http.get(url);
  }

  search(store: string, search: string): Observable<any> {
    // Construye la URL con el parámetro 'nombre'
    const url = `${this.url_base}/${store}/search/${search}`;
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
