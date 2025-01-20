import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from './order.service';

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

  getOrders() {
    const orders = JSON.parse(localStorage.getItem('store')!).orders;
    return orders;
  }

  getOrderById(order_id: number | null) {
    const url = `${this.url_private}/${this.name()}/orders/${order_id}`;
    return this.http.get(url);

    const orders = JSON.parse(localStorage.getItem('store')!).orders;
    const order = orders.find((order: any) => order.id == order_id);

    if (order != null) {
      // Retorna un observable con el pedido encontrado
      return of(order);
    } else {
      // Si no está en localStorage, hace la solicitud HTTP
      const url = `${this.url_private}/${this.name()}/orders/${order_id}`;
      return this.http.get(url);
    }
  }

  setOrders(data: [], warehouse_id: number) {
    const store = JSON.parse(localStorage.getItem('store')!);
    // const warehouse = store.warehouses.find((warehouse:any) => warehouse.id == warehouse_id);
    // warehouse['orders'] = data;

    const warehouseIndex = store.warehouses.findIndex(
      (warehouse: any) => warehouse.id == warehouse_id
    );

    if (warehouseIndex !== -1) {
      // Si se encuentra el warehouse, actualizas el objeto
      store.warehouses[warehouseIndex]['orders'] = data;

      // Si necesitas guardar de nuevo en localStorage
      // store.warehouses = warehouses;
      localStorage.setItem('store', JSON.stringify(store));
    }

    // localStorage.setItem('store', JSON.stringify(store));
  }

  setOrder(dataOrder: any) {
    //dataOrder es una sola orden

    let store = JSON.parse(localStorage.getItem('store')!);

    let orders = store.orders.map((order: any) => {
      if (order.id === dataOrder.id) {
        return dataOrder; // Reemplaza el objeto si coincide el id
      }
      return order; //sino encuentro el id, deja el order original
    });

    store['orders'] = orders;

    localStorage.setItem('store', JSON.stringify(store));
  }
  //43277
  setOrderItem(dataItem: any) {
    //dataOrder es una sola orden

    let store = JSON.parse(localStorage.getItem('store')!);

    let order = store.orders.find(
      (order: any) => order.id == dataItem.order_id
    );

    let items = order.items.map((item: any) => {
      if (item.id === dataItem.id) {
        return dataItem; // Reemplaza el objeto si coincide el id
      }
      return item; //sino encuentro el id, deja el order original
    });

    order['items'] = items;

    this.setOrder(order); //actualiza el orde en especifico con los cambios hechos a los irems

    // localStorage.setItem('store', JSON.stringify(store));
  }

  name() {
    if (localStorage.getItem('slug_base')) {
      return localStorage.getItem('slug_base'); //el ! le indica que no sera vacio
    } else {
      return '';
    }
  }

  info() {
    if (localStorage.getItem('store')) {
      return JSON.parse(localStorage.getItem('store')!); //el ! le indica que no sera vacio
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

  origins() {
    const store = JSON.parse(localStorage.getItem('store')!);
    if (store.origins != null) {
      return store.origins; //el ! le indica que no sera vacio
    } else {
      return '';
    }
  }

  gateways() {
    const store = JSON.parse(localStorage.getItem('store')!);
    if (store.gateways != null) {
      return store.gateways; //el ! le indica que no sera vacio
    } else {
      return '';
    }
  }

  couriers() {
    const store = JSON.parse(localStorage.getItem('store')!);
    if (store.couriers != null) {
      return store.couriers; //el ! le indica que no sera vacio
    } else {
      return '';
    }
  }
  delivery_methods() {
    const store = JSON.parse(localStorage.getItem('store')!);
    if (store.delivery_methods != null) {
      return store.delivery_methods; //el ! le indica que no sera vacio
    } else {
      return '';
    }
  }

  isValid(name: string): Observable<boolean> {
    //name quiere decir el nombre del la primera (storeName) palabra del slug /storeName/login/etc

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
        console.error('El nombre de la tienda ' + name + ' no existe:', err);
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

  private slugName: BehaviorSubject<string> = new BehaviorSubject<string>(''); //aqui el BehaviorSubject necesita un valor inicial en el argumento y le estamos pasando []

  //Envia el valor de la propieadad a los componentes
  getNameObservable() {
    return this.slugName.asObservable();
  }

  //Establece el valor de la propiedad
  setName(value: string) {
    console.log();
    this.slugName.next(value);
  }

  // Método para obtener el valor actual sin necesidad de suscripción
  getNameValue() {
    return this.slugName.getValue(); // Obtiene el valor actual directamente
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

  show(store: string): Observable<any> {
    // Construye la URL con el parámetro 'nombre'
    const url = `${this.urlPrivate}/${store}`;
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

  searchWarehouse(
    store: string,
    warehouse: number,
    search: string
  ): Observable<any> {
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
    const url = `${
      this.url_private
    }/${this.leerSlugBase()}/products/categories`;
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

  save(data: []): Observable<any> {
    // Construye la URL con el parámetro 'nombre'

    const url = `${this.urlPrivate}/${this.name()}/update`;
    // const url = `${this.url_base}?store=${store}`;
    // console.log(url);

    return this.http.post(url, data);
  }

  private sidebarVisibility: Subject<boolean> = new Subject<boolean>();

  /** CREANDO LOS SETTER Y GETTER */

  setOpenSidebar(value: boolean) {
    this.sidebarVisibility.next(value);
    // this.cartVisibility.complete(); //termina la suscripcion, util cuando solo se requiere usar una sola vez
  }

  getOpenSidebarObservable() {
    return this.sidebarVisibility.asObservable();
  }

  // verifyStore(storeName: string): Observable<boolean> {
  //   return this.http.get<{status: number, success: boolean, message: string, error?: any}>(`${this.url_base}/${storeName}`).pipe(
  //     map(response => response.success), // Retorna true si `success` es true
  //     catchError(() => of(false)) // Maneja errores de manera adecuada
  //   );
  // }
}
