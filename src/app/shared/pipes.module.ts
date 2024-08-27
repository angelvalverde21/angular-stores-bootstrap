import { NgModule } from '@angular/core';
import { ShortTitlePipe } from './Pipes/short-title.pipe';
import { FirstNamePipe } from './Pipes/first-name.pipe';
import { PenPipe } from './Pipes/pen.pipe';



@NgModule({

  declarations: [
    ShortTitlePipe,
    FirstNamePipe,
    PenPipe,
  ],
  
  exports: [
    ShortTitlePipe,
    FirstNamePipe,
    PenPipe,
  ],

  imports: [
  ]
})

export class PipesModule { }
