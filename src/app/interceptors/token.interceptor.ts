import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
// import { LogService } from '../servicios/log.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptor implements HttpInterceptor {
  // constructor(

  // ) {
  //   console.log('he pasado por el token interceptor');

  //  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // const headers = new HttpHeaders({
    //   'token-userx': 'asasdasasd'
    // });

    // const reqClone = req.clone({
    //   headers
    // });

    // const headers = new HttpHeaders({
    //   'token-usuario': 'ABC1290381902ALKSDJ1902'
    // });

    if (typeof window !== 'undefined') {
      const reqClone = req.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      console.log('se paso por el interceptor');
      // throw new Error('Method not implemented.');
      return next.handle(reqClone);
    } else {
      // Manejo en caso de no estar en un entorno de navegador
      console.log('No se puede acceder a localStorage en este entorno.');
      return next.handle(req);
    }
  }
}
