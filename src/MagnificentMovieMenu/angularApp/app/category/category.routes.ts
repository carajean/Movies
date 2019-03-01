import { RouterModule, Routes } from '@angular/router';

import { CategoryComponent } from './components/category.component';

const routes: Routes = [
  { path: 'menu/:name', component: CategoryComponent },
  { path: 'menu/all', component: CategoryComponent }
];

export const CategoryRoutes = RouterModule.forChild(routes);
