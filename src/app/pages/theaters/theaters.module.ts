import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TheatersRoutingModule } from './theaters-routing.module';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    // aqui se ponen los componentes que se van a usar en este módulo TheatersModule
    ListComponent,
    ManageComponent
  ],
  imports: [
    // aqui se ponen los módulos que se van a usar en este módulo TheatersModule
    CommonModule,
    TheatersRoutingModule,
    FormsModule
  ]
})
export class TheatersModule { }
