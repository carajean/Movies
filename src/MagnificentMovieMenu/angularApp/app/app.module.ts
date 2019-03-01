import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { CategoryModule } from './category/category.module';
import { MovieDetailModule } from './movie-detail/movie-detail.module';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutes,
    SharedModule,
    CoreModule.forRoot(),
    HomeModule,
    CategoryModule,
    MovieDetailModule
  ],

  declarations: [AppComponent],

  bootstrap: [AppComponent]
})
export class AppModule {}
