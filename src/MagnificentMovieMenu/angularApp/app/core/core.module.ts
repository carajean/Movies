import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { Configuration } from '../app.constants';
import { ThingService } from './services/thing-data.service';
import { ListService } from './services/list-data.service';
import { MovieService } from './services/movie-data.service';
import { IMDBService } from './services/imdb.service';

@NgModule({
  imports: [CommonModule]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        ThingService,
        ListService,
        MovieService,
        IMDBService,
        Configuration
      ]
    };
  }
}
