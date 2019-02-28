import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { MoviesComponent } from './movie/movies/movies.component';
import { MovieDetailComponent } from './movie/movie-detail/movie-detail.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MovieSearchComponent } from './movie/movie-search/movie-search.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { ListService } from './list.service';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { EnvironmentUrlService } from 'src/shared/environment-url.service';
import { RepositoryService } from 'src/shared/repository.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    MoviesComponent,
    MovieDetailComponent,
    DashboardComponent,
    MovieSearchComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AppRoutingModule
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    // HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
    //   dataEncapsulation: false
    // })
  ],
  providers: [ListService, EnvironmentUrlService, RepositoryService],
  bootstrap: [AppComponent]
})
export class AppModule {}