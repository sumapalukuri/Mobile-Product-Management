import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ListComponent } from './components/list/list.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DeleteConfirmationPopupComponent } from './components/delete-confirmation-popup/delete-confirmation-popup.component';


@NgModule({
  declarations: [
    ListComponent,
    AddProductComponent,
    EditProductComponent,
    DeleteConfirmationPopupComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class ProductModule { }
