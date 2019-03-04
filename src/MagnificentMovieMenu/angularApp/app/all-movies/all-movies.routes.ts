import { RouterModule, Routes } from '@angular/router';

import { AllMoviesComponent } from './components/all-movies.component';

const routes: Routes = [{ path: 'menu/all', component: AllMoviesComponent }];

export const AllMoviesRoutes = RouterModule.forChild(routes);
