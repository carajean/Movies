import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AllMoviesComponent } from './components/all-movies.component';
import { AllMoviesRoutes } from './all-movies.routes';

@NgModule({
  imports: [CommonModule, FormsModule, HttpClientModule, AllMoviesRoutes],

  declarations: [AllMoviesComponent],

  exports: [AllMoviesComponent]
})
export class AllMoviesModule {}
