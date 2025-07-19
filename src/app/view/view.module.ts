import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { ViewRoutingModule } from './view-routing.module';
import { View } from './view';


@NgModule({
  declarations: [
    View
  ],
  imports: [
    CommonModule,
    FormsModule,

    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,

    ViewRoutingModule,
  ]
})
export class ViewModule { }
