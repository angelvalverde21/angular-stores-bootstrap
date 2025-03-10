import { NgModule } from '@angular/core';
import { ShortTitlePipe } from './Pipes/short-title.pipe';
import { FirstNamePipe } from './Pipes/first-name.pipe';
import { PenPipe } from './Pipes/pen.pipe';
import { UpperFirstPipe } from './Pipes/upper-first.pipe';
import { ShortNameSizePipe } from './Pipes/short-name-size.pipe';
import { SlugPipe } from './Pipes/slug.pipe';
import { DateCustomPipe } from './Pipes/date-custom.pipe';

@NgModule({

  declarations: [
    ShortTitlePipe,
    FirstNamePipe,
    PenPipe,
    UpperFirstPipe,
    ShortNameSizePipe,
    SlugPipe,
    DateCustomPipe
  ],
  
  exports: [
    ShortTitlePipe,
    FirstNamePipe,
    PenPipe,
    UpperFirstPipe,
    ShortNameSizePipe,
    SlugPipe,
    DateCustomPipe
  ],

  imports: [
  ]
})

export class PipesModule { }
