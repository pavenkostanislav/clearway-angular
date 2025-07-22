import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ViewRoutingModule } from './view-routing.module';
import { View } from './view';
import { AutoFocusDirective } from '../auto-focus.directive';
import { ImageAnnotator } from './image-annotator/image-annotator';


@NgModule({
  declarations: [
    View,
    ImageAnnotator
  ],
  imports: [
    CommonModule,
    FormsModule,

    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatToolbarModule,

    ViewRoutingModule,
    AutoFocusDirective
  ]
})
export class ViewModule { }
