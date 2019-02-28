import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';
import { CoreModule } from './core/core.module';
import { MenuModule } from './menu/menu.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutes,
    SharedModule,
    CoreModule.forRoot(),
    MenuModule
  ],

  declarations: [AppComponent],

  bootstrap: [AppComponent]
})
export class AppModule {}
