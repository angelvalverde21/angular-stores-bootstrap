import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class verifySlugBaseGuard implements CanActivate {
  constructor(private _auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    // console.log('guard');

    if (localStorage.getItem('slug_base') != null) {
      return true;
    } else {
      return false;
    }
  }
}
