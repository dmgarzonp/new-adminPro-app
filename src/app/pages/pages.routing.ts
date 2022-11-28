//Propios de angular
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";

//Servicios
import { AuthGuard } from '../guards/auth.guard';

//Creadas
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Configuraciones de la cuenta'} },
      { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Grafica Dona'} },
      { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de usuario'} },
      { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgresBar'} },
      { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas'} },
      { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Rxjs'} },
      { path: '', component: DashboardComponent, data: { titulo: 'Dashboard'} },
    ]

  },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PageRoutingModule { }
