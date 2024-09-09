import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  public fileUploaded: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ready(response: any) {
    this.fileUploaded.emit(response);
  }

}
