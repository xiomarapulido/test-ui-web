import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';

import { IndexComponent } from './index/index.component';
import { ShopListComponent } from './shop-list/shop-list.component';
import { ShopMosaicComponent } from './shop-mosaic/shop-mosaic.component';


@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ComponentsModule
  ],
  declarations: [
    IndexComponent,
    ShopListComponent,
    ShopMosaicComponent,
  ],
  exports: [
    IndexComponent
  ],
})
export class PagesModule { }
