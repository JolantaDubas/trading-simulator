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
import { NgApexchartsModule } from 'ng-apexcharts';
import { SearchComponent } from './search/search.component';
import { SelectComponent } from './select/select.component';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ShortNumberPipe } from '../core/pipes/short-number';

@NgModule({
  declarations: [
    BoxComponent,
    PriceChangeComponent,
    SearchComponent,
    SelectComponent,
    ShortNumberPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ScrollingModule,
    FormsModule,
    MatInputModule,
    DataTablesModule,
    RouterModule,
    MatFormFieldModule,
    NgApexchartsModule,
    MatSelectModule,
    MatAutocompleteModule,
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
    NgApexchartsModule,
    MatSelectModule,
    SelectComponent,
    MatAutocompleteModule,
    ShortNumberPipe,
  ],
})
export class SharedModule {}
