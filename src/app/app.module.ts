import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { SidenavComponent } from './componentes/sidenav/sidenav.component';
import { FaqComponent } from './componentes/faq/faq.component';
import { TecnicaComponent } from './componentes/tecnica/tecnica.component';
import { ConectividadComponent } from './componentes/conectividad/conectividad.component';
import { NoticiasComponent } from './componentes/noticias/noticias.component';
import { ContenidosComponent } from './componentes/contenidos/contenidos.component';
import { ManualesComponent } from './componentes/manuales/manuales.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SidenavComponent,
    FaqComponent,
    TecnicaComponent,
    ConectividadComponent,
    NoticiasComponent,
    ContenidosComponent,
    ManualesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
