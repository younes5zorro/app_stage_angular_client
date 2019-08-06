import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { FormComponent } from './form/form.component';
import { ReponseComponent } from './reponse/reponse.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CompositionComponent } from './composition/composition.component';
import { NgxEchartsModule } from 'ngx-echarts';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'form',
    component: FormComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'composition',
    component: CompositionComponent
  },
  {
    path: 'reponse/:id',
    component: ReponseComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
