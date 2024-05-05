import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';

const routes: Routes = [
  { path: 'list', component: ListComponent },
  { path: 'create', component: ManageComponent },
  { path: 'update/:id', component: ManageComponent },
  { path: 'view/:id', component: ManageComponent }
];

@NgModule({
  //registra las rutas hijas de este módulo las cuales son: list, create, update y view
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TheatersRoutingModule { }


/*

En Angular, las rutas se pueden definir en el nivel de la aplicación (usando RouterModule.forRoot()) 
o en el nivel del módulo (usando RouterModule.forChild()). 

RouterModule.forRoot() se utiliza en el módulo raíz de la aplicación (generalmente AppModule) para 
registrar las rutas principales de la aplicación.

RouterModule.forChild() se utiliza en los módulos secundarios para registrar rutas adicionales que son 
específicas de ese módulo. Estas rutas se anexan a las rutas principales de la aplicación.

En este caso, RouterModule.forChild(routes) registra las rutas definidas en [routes] como rutas hijas
del módulo TheatersModule.

*/