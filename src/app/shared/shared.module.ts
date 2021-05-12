import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { BoxComponent } from './box/box.component';
import { PriceChangeComponent } from './price-change/price-change.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [BoxComponent, PriceChangeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ScrollingModule,
    FormsModule,
    MatInputModule,
    DataTablesModule,
    RouterModule,
    MatFormFieldModule,
  ],
  exports: [
    BoxComponent,
    ReactiveFormsModule,
    ScrollingModule,
    FormsModule,
    MatInputModule,
    DataTablesModule,
    MatFormFieldModule,
    PriceChangeComponent,
  ],
})
export class SharedModule {}
