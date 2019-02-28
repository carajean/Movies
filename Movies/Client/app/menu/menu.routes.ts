import { RouterModule, Routes } from '@angular/router';

import { MenuComponent } from './components/menu.component';

const routes: Routes = [{ path: 'menu', component: MenuComponent }];

export const MenuRoutes = RouterModule.forChild(routes);
