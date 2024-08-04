import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortTitle'
})
export class ShortTitlePipe implements PipeTransform {

  arrayTitle: any = [];

  transform(title: string): unknown {

    //this.arrayTitle = title.split('-');
    this.arrayTitle  = title.split('-');
    // console.log(title);
    return this.arrayTitle[0];
    
  }

}

