import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFound } from './not-found/not-found';

const routes: Routes = [
  {
    path: 'viewer/view',
    loadChildren: () => import('./view/view.module').then(m => m.ViewModule)
  },
  {
    path: '',
    redirectTo: '/viewer/view/1',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotFound
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }