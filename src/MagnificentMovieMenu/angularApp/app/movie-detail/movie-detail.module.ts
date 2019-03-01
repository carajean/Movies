import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MovieDetailComponent } from './components/movie-detail.component';
import { MovieDetailRoutes } from './movie-detail.routes';

@NgModule({
  imports: [CommonModule, FormsModule, HttpClientModule, MovieDetailRoutes],

  declarations: [MovieDetailComponent],

  exports: [MovieDetailComponent]
})
export class MovieDetailModule {}
