import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { ListComponent } from './components/list/list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'mobiles',
    pathMatch: 'full'
  },
  {
    path: 'mobiles',
    component: ListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-mobile',
    component: AddProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-mobile',
    component: EditProductComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
