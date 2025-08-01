import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { View } from './view';
import { DocumentResolver } from '../document.resolver';

const routes: Routes = [{ 
  path: ':id',
  component: View,
  resolve: {
    documentData: DocumentResolver
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewRoutingModule { }
