import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';


// se debe importar AppRoutingModule para que las rutas de la aplicación estén disponibles ya que el módulo principal de la aplicación es AppModule
// y es el que se importa en el archivo main.ts
@NgModule({
  // en imports se definen los módulos que pertenecen a este módulo
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule
  ],
  // en declarations se definen los componentes, directivas y pipes que pertenecen a este módulo
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent
  ],
  // en providers se definen los servicios que pertenecen a este módulo
  providers: [],
  // en bootstrap se define el componente raíz de la aplicación
  bootstrap: [AppComponent]
})
export class AppModule { }
