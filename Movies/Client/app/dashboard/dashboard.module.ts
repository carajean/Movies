import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DashboardComponent } from './components/dashboard.component';
import { DashboardRoutes } from './dashboard.routes';

@NgModule({
  imports: [CommonModule, FormsModule, HttpClientModule, DashboardRoutes],

  declarations: [DashboardComponent],

  exports: [DashboardComponent]
})
export class DashboardModule {}
