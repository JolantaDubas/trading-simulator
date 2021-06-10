import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoAuthRoutingModule } from './no-auth-routing.module';
import { LandingComponent } from './landing/landing.component';
import { CoinDetailsComponent } from './coin-details/coin-details.component';
import { MarketComponent } from './market/market.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DiagramsComponent } from './coin-details/components/diagrams/diagrams.component';
import { SparklineComponent } from './market/components/sparkline/sparkline.component';
import { TableComponent } from './market/components/table/table.component';
import { DetailsComponent } from './coin-details/components/details/details.component';

@NgModule({
  declarations: [
    LandingComponent,
    CoinDetailsComponent,
    MarketComponent,
    DiagramsComponent,
    SparklineComponent,
    TableComponent,
    DetailsComponent,
  ],
  imports: [CommonModule, NoAuthRoutingModule, SharedModule],
})
export class NoAuthModule {}
