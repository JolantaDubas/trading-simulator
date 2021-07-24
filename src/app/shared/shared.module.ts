import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { BoxComponent } from './box/box.component';
import { PriceChangeComponent } from './price-change/price-change.component';

import { MatSliderModule } from '@angular/material/slider';
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
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { InputComponent } from './input/input.component';
import { BuySellComponent } from './buy-sell/buy-sell.component';
import { WalletComponent } from './wallet/wallet.component';
import { TradesComponent } from './trades/trades.component';

@NgModule({
  declarations: [
    BoxComponent,
    PriceChangeComponent,
    SearchComponent,
    SelectComponent,
    ShortNumberPipe,
    PieChartComponent,
    InputComponent,
    BuySellComponent,
    WalletComponent,
    TradesComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ScrollingModule,
    FormsModule,
    MatSliderModule,
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
    MatSliderModule,
    MatInputModule,
    DataTablesModule,
    MatFormFieldModule,
    PriceChangeComponent,
    NgApexchartsModule,
    MatSelectModule,
    SelectComponent,
    MatAutocompleteModule,
    ShortNumberPipe,
    PieChartComponent,
    InputComponent,
    BuySellComponent,
    WalletComponent,
    TradesComponent,
  ],
})
export class SharedModule {}
