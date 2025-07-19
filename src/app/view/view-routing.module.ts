import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { View } from './view';

const routes: Routes = [{ 
  path: ':id',
  component: View 
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewRoutingModule { }
