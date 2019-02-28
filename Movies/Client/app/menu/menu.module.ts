import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MenuComponent } from './components/menu.component';
import { MenuRoutes } from './menu.routes';

@NgModule({
  imports: [CommonModule, FormsModule, HttpClientModule, MenuRoutes],

  declarations: [MenuComponent],

  exports: [MenuComponent]
})
export class MenuModule {}
