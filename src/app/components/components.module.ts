import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HeadComponent } from './head/head.component';
import { ShopFiltersComponent } from './shop-filters/shop-filters.component';
import { CarShoppingComponent } from './car-shopping/car-shopping.component';
import { ViewMoreComponent } from './view-more/view-more.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    HeadComponent,
    ShopFiltersComponent,
    CarShoppingComponent,
    ViewMoreComponent,
  ],
  exports: [
    HeadComponent,
    ShopFiltersComponent,
    CarShoppingComponent,
    ViewMoreComponent,
  ]
})
export class ComponentsModule { }
