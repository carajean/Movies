import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CategoryComponent } from './components/category.component';
import { CategoryRoutes } from './category.routes';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        CategoryRoutes
    ],

    declarations: [
        CategoryComponent
    ],

    exports: [
        CategoryComponent
    ]
})

export class CategoryModule { }
