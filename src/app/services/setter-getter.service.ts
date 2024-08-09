import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SetterGetterService {

  constructor() { }

  public iconLoading: boolean = false;

  setIconLoading(iconLoading: boolean): void {
    this.iconLoading = iconLoading;
  }

  getIconLoading(): boolean {
    return this.iconLoading;
  }

}
