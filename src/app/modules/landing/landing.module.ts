import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { CoinDetailsComponent } from './pages/coin-details/coin-details.component';
import { MarketComponent } from './pages/market/market.component';
import { BlockItemComponent } from './block-item/block-item.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DiagramsComponent } from './pages/coin-details/components/diagrams/diagrams.component';

@NgModule({
  declarations: [
    LandingComponent,
    CoinDetailsComponent,
    MarketComponent,
    BlockItemComponent,
    DiagramsComponent,
  ],
  imports: [CommonModule, LandingRoutingModule, SharedModule],
})
export class LandingModule {}
