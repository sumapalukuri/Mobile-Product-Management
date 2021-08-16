import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'authentication/login',
    pathMatch: 'full'
  },
  {
    path: 'authentication',
    loadChildren: () => import("./authentication/authentication.module").then(module => module.AuthenticationModule),
  },
  {
    path: 'products',
    loadChildren: () => import("./product/product.module").then(module => module.ProductModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
