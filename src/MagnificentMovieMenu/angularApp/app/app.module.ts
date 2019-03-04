import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { CategoryModule } from './category/category.module';
import { MovieDetailModule } from './movie-detail/movie-detail.module';
import { AllMoviesModule } from './all-movies/all-movies.module';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutes,
    SharedModule,
    CoreModule.forRoot(),
    HomeModule,
    CategoryModule,
    MovieDetailModule,
    HttpModule,
    AllMoviesModule
  ],

  declarations: [AppComponent],

  bootstrap: [AppComponent]
})
export class AppModule {}
