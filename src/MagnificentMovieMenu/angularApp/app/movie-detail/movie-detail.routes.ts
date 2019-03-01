import { RouterModule, Routes } from '@angular/router';

import { MovieDetailComponent } from './components/movie-detail.component';

const routes: Routes = [
  { path: 'movies/:name', component: MovieDetailComponent }
];

export const MovieDetailRoutes = RouterModule.forChild(routes);
