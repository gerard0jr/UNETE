import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { SidenavComponent } from './componentes/sidenav/sidenav.component';
import { FaqComponent } from './componentes/faq/faq.component';
import { TecnicaComponent } from './componentes/tecnica/tecnica.component';
import { ConectividadComponent } from './componentes/conectividad/conectividad.component';
import { NoticiasComponent } from './componentes/noticias/noticias.component';
import { ContenidosComponent } from './componentes/contenidos/contenidos.component';
import { ManualesComponent } from './componentes/manuales/manuales.component';

const routes: Routes = [
  {
    path: '', 
    component: LoginComponent
  },
  {
    path: 'home', 
    component: HomeComponent
  },
  {
    path: 'sidenav', 
    component: SidenavComponent
  },
  {
    path: 'faq', 
    component: FaqComponent
  },
  {
    path: 'tecnica', 
    component: TecnicaComponent
  },
  {
    path: 'conectividad', 
    component: ConectividadComponent
  },
  {
    path: 'noticias', 
    component: NoticiasComponent
  },
  {
    path: 'contenidos', 
    component: ContenidosComponent
  },
  {
    path: 'manuales', 
    component: ManualesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
