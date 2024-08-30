import { NgModule } from '@angular/core';
import { ShortTitlePipe } from './Pipes/short-title.pipe';
import { FirstNamePipe } from './Pipes/first-name.pipe';
import { PenPipe } from './Pipes/pen.pipe';
import { UpperFirstPipe } from './Pipes/upper-first.pipe';



@NgModule({

  declarations: [
    ShortTitlePipe,
    FirstNamePipe,
    PenPipe,
    UpperFirstPipe,
  ],
  
  exports: [
    ShortTitlePipe,
    FirstNamePipe,
    PenPipe,
    UpperFirstPipe,
  ],

  imports: [
  ]
})

export class PipesModule { }
