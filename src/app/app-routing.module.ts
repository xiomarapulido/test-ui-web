import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const appRoutes: Routes = [
    {
        path: 'Pages',
        loadChildren: 'app/pages/pages.module#PagesModule'
    },
    {
        path: '',
        redirectTo: '/Pages/Index',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(appRoutes, { useHash: true }) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
