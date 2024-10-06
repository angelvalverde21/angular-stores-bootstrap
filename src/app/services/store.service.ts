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
  private url_private = environment.apiPrivate;
  private urlPrivate = environment.apiPrivate;
  private urlPublic = environment.apiPublic;

  constructor(private http: HttpClient, private router: Router) {}

  leerSlugBase() {
    if (localStorage.getItem('slug_base')) {
      return localStorage.getItem('slug_base'); //el ! le indica que no sera vacio
    } else {
      return '';
    }
  }

  name() {
    if (localStorage.getItem('slug_base')) {
      return localStorage.getItem('slug_base'); //el ! le indica que no sera vacio
    } else {
      return '';
    }
  }

  storeWarehouses() {
    if (localStorage.getItem('store')) {
      return JSON.parse(localStorage.getItem('store')!); //el ! le indica que no sera vacio
    } else {
      return '';
    }
  }

  warehouses() {
    if (localStorage.getItem('store')) {
      return JSON.parse(localStorage.getItem('store')!).warehouses; //el ! le indica que no sera vacio
    } else {
      return '';
    }
  }

  isValid(name: string): Observable<boolean> { //name quiere decir el nombre del la primera (storeName) palabra del slug /storeName/login/etc

    console.log('Impresión desde la función setSlugBase: ' + name);

    if (!name) {
      return of(false);
    }

    if (
      localStorage.getItem('slug_base') === null ||
      localStorage.getItem('slug_base') !== name
    ) {
      
      console.log('verificaremos el slug inicial ' + name);
      
      return this.SlugVerification(name);
      
    } else {
      console.log('El slug existe y es ' + name);
      
      return of(true); 
    }

  }

  SlugVerification(name: string): Observable<boolean> {
    
    return this.verifyStore(name).pipe(
      map((resp: any) => {
        console.log('se ha seteado el slug_base ' + name);
        console.log(resp);

        localStorage.setItem('store', JSON.stringify(resp.data));
        localStorage.setItem('slug_base', name);
        return true;
      }),
      catchError((err: any) => {
        console.log('redireccionando a la pagina de login');
        this.router.navigate(['/', name, 'error-404']);
        console.error(
          'El nombre de la tienda ' + name + ' no existe:',
          err
        );
        return of(false); // Devuelve un observable vacío para manejar el error
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

  // Método para obtener el valor actual sin necesidad de suscripción
  getNameValue() {
    return this.slugName.getValue();  // Obtiene el valor actual directamente
  }

  /****************************************************************************************** */

  // getSlug(): string {
  //   return localStorage.getItem('slug_base')!;
  // }

  getHome(store: string): Observable<any> {
    console.log('se llamo a getHome');
    console.log(store);
    
    // Construye la URL con el parámetro 'nombre'
    const url = `${this.urlPublic}/${store}`;
    // const url = `${this.url_base}?store=${store}`;
    // console.log(url);

    return this.http.get(url);
  }

  search(store: string, search: string): Observable<any> {
    // Construye la URL con el parámetro 'nombre'
    const url = `${this.urlPrivate}/${store}/products/search/${search}`;
    // const url = `${this.url_base}?store=${store}`;
    // console.log(url);

    return this.http.get(url);
  }

  
  searchPublic(store: string, search: string): Observable<any> {
    // Construye la URL con el parámetro 'nombre'
    const url = `${this.urlPublic}/${store}/products/search/${search}`;
    // const url = `${this.url_base}?store=${store}`;
    // console.log(url);

    return this.http.get(url);
  }

  searchWarehouse(store: string, warehouse: number, search: string): Observable<any> {
    // Construye la URL con el parámetro 'nombre'
    const url = `${this.urlPrivate}/${store}/products/warehouses/${warehouse}/search/${search}`;
    // const url = `${this.url_base}?store=${store}`;
    // console.log(url);

    return this.http.get(url);
  }



  inventory(): Observable<any> {
    // Construye la URL con el parámetro 'nombre'
    const url = `${this.url_private}/${this.leerSlugBase()}/products`;
    console.log(url);
    
    // const url = `${this.url_base}?store=${store}`;
    // console.log(url);

    return this.http.get(url);
  }

  categories(): Observable<any> {
    // Construye la URL con el parámetro 'nombre'
    const url = `${this.url_private}/${this.leerSlugBase()}/products/categories`;
    console.log(url);
    
    // const url = `${this.url_base}?store=${store}`;
    // console.log(url);

    return this.http.get(url);
  }
  
  productSizes(): Observable<any> {
    // Construye la URL con el parámetro 'nombre'
    const url = `${this.url_private}/${this.leerSlugBase()}/products/sizes`;
    console.log(url);
    
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
