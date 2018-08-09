import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//imports
import 'hammerjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule, MatButtonModule, MatIconModule, MatMenuModule, MatCardModule, MatSidenavModule } from '@angular/material';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { FacebookModule } from 'ngx-facebook';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { FlashMessagesModule } from 'angular2-flash-messages';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { AuthService } from './servicios/auth.service';
import { DatabaseService } from './servicios/database/database.service';
import { MessagingService } from './servicios/messaging.service' ;


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
import { RegistroComponent } from './componentes/registro/registro.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { CctComponent } from './componentes/cct/cct.component';

import { AuthGuard }  from './guards/auth.guard';
import { ServiceWorkerModule } from '@angular/service-worker';
import { PerfilComponent } from './componentes/perfil/perfil.component';




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
    ManualesComponent,
    RegistroComponent,
    InicioComponent,
    CctComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatProgressBarModule,
    FormsModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FlashMessagesModule,
    FacebookModule.forRoot(),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [ AuthService, AuthGuard, FlashMessagesService, DatabaseService ,MessagingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
