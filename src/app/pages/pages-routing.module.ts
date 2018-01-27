import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { ShopMosaicComponent } from './shop-mosaic/shop-mosaic.component';
import { ShopListComponent } from './shop-list/shop-list.component';

const routes: Routes = [
  {
    path: 'Index',
    component: IndexComponent
  },
  {
    path: 'Shop-Mosaic/:Category/:State/:Product',
    component: ShopMosaicComponent
  },
  {
    path: 'Shop-list/:Category/:State/:Product',
    component: ShopListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
