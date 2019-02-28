import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard.component';

const routes: Routes = [{ path: 'list', component: DashboardComponent }];

export const DashboardRoutes = RouterModule.forChild(routes);
