import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/components/home.component';

export const routes: Routes = [
    { path: '', redirectTo: 'menu', pathMatch: 'full' },
    { path: 'about', loadChildren: './about/about.module#AboutModule'},
    { path: 'movies', component: HomeComponent}
];

export const AppRoutes = RouterModule.forRoot(routes);
