import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-profile', canActivate: [AuthGuard], component: UserProfileComponent },
    { path: 'tables', component: TablesComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'maps', component: MapsComponent },
    // teatros se carga de forma lazy, es decir, se carga solo cuando se accede a la ruta
    {
        path: 'theaters',
        canActivate: [AuthGuard],
        loadChildren: () => import('src/app/pages/theaters/theaters.module').then(m => m.TheatersModule)
    },
    {
        path: 'movies',
        loadChildren: () => import('src/app/pages/movies/movies.module').then(m => m.MoviesModule)
    }
];



