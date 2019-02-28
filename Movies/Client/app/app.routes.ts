import { RouterModule, Routes } from '@angular/router';
// import { NotFoundComponent } from './error-pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'about', loadChildren: './about/about.module#AboutModule' }
  //   { path: '404', component: NotFoundComponent },
  //   { path: '**', redirectTo: '404' }
];

export const AppRoutes = RouterModule.forRoot(routes);
