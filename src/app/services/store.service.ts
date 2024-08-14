import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  //private url = 'https://3b.pe/api/v1/ara/products';
  private url_base = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}



  slugBase(name: string): Observable<any> { //name quiere decir el nombre del la primera (storeName) palabra del slug /storeName/login/etc

    console.log('Impresión desde la función setSlugBase: ' + name);

    if (!name) {
      return of(null);
    }

    if (
      localStorage.getItem('slug_base') === null ||
      localStorage.getItem('slug_base') !== name
    ) {
      
      console.log('verificaremos el slug inicial ' + name);
      
      return this.SlugVerification(name);
    } else {
      console.log('El slug existe y es ' + name);
      
      return of({ name }); 
    }

  }

  SlugVerification(name: string): Observable<any> {
    
    return this.verifyStore(name).pipe(
      switchMap((resp: any) => {
        console.log('se ha seteado el slug_base ' + name);

        localStorage.setItem('slug_base', name);

        return of({ name });
      }),
      catchError((err: any) => {
        this.router.navigate(['/', name, 'error-404']);
        console.error(
          'El nombre de la tienda ' + name + ' no existe:',
          err
        );
        return of(null); // Devuelve un observable vacío para manejar el error
      })
    );
  }

  verifyStore(store: string): Observable<any> {
    // Construye la URL con el parámetro 'nombre'
    const url = `${this.url_base}/${store}/verify`;
    // const url = `${this.url_base}?store=${store}`;
    // console.log(url);

    return this.http.get(url);
  }

  // getSlugObservable() {
  //   return this.slugBase.asObservable();
  // }

  /****************************************************************************************** */

  private slugName: BehaviorSubject<string> = new BehaviorSubject<string>(""); //aqui el BehaviorSubject necesita un valor inicial en el argumento y le estamos pasando []

  //Envia el valor de la propieadad a los componentes
  getNameObservable() {
    return this.slugName.asObservable();
  }

  //Establece el valor de la propiedad 
  setName(value: string) {
    console.log();
    this.slugName.next(value)
  }

  /****************************************************************************************** */

  // getSlug(): string {
  //   return localStorage.getItem('slug_base')!;
  // }

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


  // verifyStore(storeName: string): Observable<boolean> {
  //   return this.http.get<{status: number, success: boolean, message: string, error?: any}>(`${this.url_base}/${storeName}`).pipe(
  //     map(response => response.success), // Retorna true si `success` es true
  //     catchError(() => of(false)) // Maneja errores de manera adecuada
  //   );
  // }
}
