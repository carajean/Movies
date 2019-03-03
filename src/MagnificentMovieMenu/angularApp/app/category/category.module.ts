import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CategoryComponent } from './components/category.component';
import { CategoryRoutes } from './category.routes';
import { MovieSearchComponent } from './components/movie-search.component';

@NgModule({
  imports: [CommonModule, FormsModule, HttpClientModule, CategoryRoutes],

  declarations: [CategoryComponent, MovieSearchComponent],

  exports: [CategoryComponent, MovieSearchComponent]
})
export class CategoryModule {}
