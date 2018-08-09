import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { FaqComponent } from './componentes/faq/faq.component';
import { TecnicaComponent } from './componentes/tecnica/tecnica.component';
import { ConectividadComponent } from './componentes/conectividad/conectividad.component';
import { NoticiasComponent } from './componentes/noticias/noticias.component';
import { ContenidosComponent } from './componentes/contenidos/contenidos.component';
import { ManualesComponent } from './componentes/manuales/manuales.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { CctComponent } from './componentes/cct/cct.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: AppComponent},
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'home', component: HomeComponent, canActivate:[AuthGuard], 
    children:[
      { path: 'inicio', component: InicioComponent },
      { path: 'faq', component: FaqComponent },
      { path: 'tecnica', component: TecnicaComponent },
      { path: 'conectividad', component: ConectividadComponent },
      { path: 'noticias', component: NoticiasComponent },
      { path: 'contenidos', component: ContenidosComponent },
      { path: 'cct', component: CctComponent },
      { path: 'manuales', component: ManualesComponent }]
  },
  { path: '**', component: InicioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
