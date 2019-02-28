import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'menu', pathMatch: 'full' },
  { path: 'about', loadChildren: './about/about.module#AboutModule' }
];

export const AppRoutes = RouterModule.forRoot(routes);
