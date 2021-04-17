import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { CoinDetailsComponent } from './pages/coin-details/coin-details.component';
import { MarketComponent } from './pages/market/market.component';
import { BlockItemComponent } from './block-item/block-item.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    LandingComponent,
    CoinDetailsComponent,
    MarketComponent,
    BlockItemComponent,
  ],
  imports: [CommonModule, LandingRoutingModule, SharedModule],
})
export class LandingModule {}
