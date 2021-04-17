import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing.component';
import { CoinDetailsComponent } from './pages/coin-details/coin-details.component';
import { MarketComponent } from './pages/market/market.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'coin/:id', component: CoinDetailsComponent },
  { path: 'market', component: MarketComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingRoutingModule {}
